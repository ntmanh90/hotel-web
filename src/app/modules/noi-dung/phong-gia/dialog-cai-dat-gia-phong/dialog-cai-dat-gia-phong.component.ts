import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
import {
  CaiDatGiaBanSoLuongTrangThai,
  ENUM_TYPE_UPDATE,
} from "../../_models/phong-gia.model";

@Component({
  selector: "app-dialog-cai-dat-gia-phong",
  templateUrl: "./dialog-cai-dat-gia-phong.component.html",
  styleUrls: ["./dialog-cai-dat-gia-phong.component.scss"],
})
export class DialogCaiDatGiaPhongComponent implements OnInit {
  public titleDialog = "Đặt số phòng để bán";
  public iD_LoaiPhong: number;
  public type: number = 1;
  public selectDate: number;
  public soLuong: number = 0;
  public giaBan: number = 0;
  public ngayBatDau: string;
  public ngayKetThuc: string;
  public validation: ValidationComponent;
  public options: FormGroup;
  constructor(
    public dialog: MatDialogRef<DialogCaiDatGiaPhongComponent>,
    private fb: FormBuilder
  ) {
    this.loadFormData();
  }
  private loadFormData() {
    this.options = this.fb.group({
      selectDate: [
        this.selectDate,
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.max(7),
        ]),
      ],
      soLuong: [this.soLuong, Validators.compose([Validators.required])],
      giaBan: [this.giaBan, Validators.compose([Validators.required])],
      ngayBatDau: [this.ngayBatDau, Validators.compose([Validators.required])],
      ngayKetThuc: [
        this.ngayKetThuc,
        Validators.compose([Validators.required]),
      ],
    });
    this.validation = new ValidationComponent(this.options);
  }
  ngOnInit(): void {}
  public updateDataInService(event) {
    if (this.options.valid) {
      const formValue = this.options.value;
      let updateResult: CaiDatGiaBanSoLuongTrangThai;
      switch (this.type) {
        case ENUM_TYPE_UPDATE.SOLUONG:
          updateResult = {
            iD_LoaiPhong: this.iD_LoaiPhong,
            type: this.type,
            ngayBatDau: formValue.ngayBatDau,
            ngayKetThuc: formValue.ngayKetThuc,
            soLuong: formValue.soLuong,
          } as CaiDatGiaBanSoLuongTrangThai;
          break;
        case ENUM_TYPE_UPDATE.GIABAN:
          updateResult = {
            iD_LoaiPhong: this.iD_LoaiPhong,
            type: this.type,
            ngayBatDau: formValue.ngayBatDau,
            ngayKetThuc: formValue.ngayKetThuc,
            giaBan: formValue.giaBan,
          } as CaiDatGiaBanSoLuongTrangThai;
          break;
      }
      this.dialog.close(updateResult);
    }
  }
  onClose() {
    this.dialog.close();
  }
}
