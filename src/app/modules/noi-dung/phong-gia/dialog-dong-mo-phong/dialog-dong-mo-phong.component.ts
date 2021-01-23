import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { LoaiPhongVM } from "../../_models/loai-phong-vm.model";
import { CaiDatGiaBanSoLuongTrangThai } from "../../_models/phong-gia.model";
import { PhongGiaService } from "../../_services/phong-gia.service";

@Component({
  selector: "app-dialog-dong-mo-phong",
  templateUrl: "./dialog-dong-mo-phong.component.html",
  styleUrls: ["./dialog-dong-mo-phong.component.scss"],
})
export class DialogDongMoPhongComponent implements OnInit, OnDestroy {
  public ngayBatDau: string;
  public ngayKetThuc: string;
  public iD_LoaiPhong: number;
  public trangThai: boolean = false;
  public options: FormGroup;
  private subscriptions: Subscription[] = [];
  public listLoaiPhong: LoaiPhongVM[] = [];
  private listIdLoaiPhong: number[] = [];
  constructor(
    private dialog: MatDialogRef<DialogDongMoPhongComponent>,
    private fb: FormBuilder,
    private phongGiaService: PhongGiaService
  ) {
    this.options = this.fb.group({
      trangThai: [this.trangThai],
      ngayBatDau: [this.ngayBatDau, Validators.compose([Validators.required])],
      ngayKetThuc: [
        this.ngayKetThuc,
        Validators.compose([Validators.required]),
      ],
    });
    this.listIdLoaiPhong = [];
    this.getAllDataPhong();
  }
  private getAllDataPhong() {
    const subGetAllPhong = this.phongGiaService
      .get_DanhSachLoaiPhong()
      .subscribe((res) => {
        this.listLoaiPhong = res;
      });
    this.subscriptions.push(subGetAllPhong);
  }
  public onCheckLoaiPhong(event, element) {
    const index = this.listIdLoaiPhong.indexOf(element.iD_LoaiPhong);
    if(index === -1){
      this.listIdLoaiPhong.push(element.iD_LoaiPhong);
    }else{
      this.listIdLoaiPhong.splice(index, 1);
    }
    console.log(this.listIdLoaiPhong);
  }
  ngOnInit(): void {}
  public saveData(event) {
    const formValue = this.options.value;
    if (this.options.valid) {
      let updateData = {
        iD_LoaiPhong: formValue.iD_LoaiPhong,
        type: 0,
        ngayBatDau: formValue.ngayBatDau,
        ngayKetThuc: formValue.ngayKetThuc,
        trangThai: formValue.trangThai,
      } as CaiDatGiaBanSoLuongTrangThai;
      this.dialog.close(updateData);
    }
  }
  public onClose() {
    this.dialog.close();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
