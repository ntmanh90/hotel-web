import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
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
  public validation: ValidationComponent;
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
    this.validation = new ValidationComponent(this.options);
    this.getAllDataPhong();
  }
  private getAllDataPhong() {
    const subGetAllPhong = this.phongGiaService
      .get_DanhSachLoaiPhong()
      .subscribe((res) => {
        this.listLoaiPhong = res;
        this.listLoaiPhong.forEach((loaiPhong) => {
          loaiPhong.check = false;
        });
      });
    this.subscriptions.push(subGetAllPhong);
  }
  ngOnInit(): void {}
  public get isValidForm(){
    return this.options.valid && this.validation.validationDate('ngayBatDau', 'ngayKetThuc');
  }
  public saveData(event) {
    const formValue = this.options.value;
    if (this.options.valid && this.validation.validationDate('ngayBatDau', 'ngayKetThuc')) {
      const arrReturn = [];
      for (let index = 0; index < this.listLoaiPhong.length; index++) {
        const element = this.listLoaiPhong[index];
        if (element.check) {
          arrReturn.push({
            iD_LoaiPhong: element.iD_LoaiPhong,
            type: 0,
            ngayBatDau: formValue.ngayBatDau,
            ngayKetThuc: formValue.ngayKetThuc,
            trangThai: formValue.trangThai,
          } as CaiDatGiaBanSoLuongTrangThai);
        }
      }
      this.dialog.close(arrReturn);
    }
  }
  public onClose() {
    this.dialog.close();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
