import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
import { CreateUpdateHoaDonModel } from "../../_models/create-update-hoa-don.model";

@Component({
  selector: "app-dialog-create-update-hoa-don",
  templateUrl: "./dialog-create-update-hoa-don.component.html",
  styleUrls: ["./dialog-create-update-hoa-don.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DialogCreateUpdateHoaDonComponent implements OnInit {
  public formData;
  public titleDialog = "Thêm mới hóa đơn";
  public _detailHoaDon: CreateUpdateHoaDonModel;
  public validation: ValidationComponent;
  public editorData = "";
  public startDate = new Date();
  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {}
  public set data(value: CreateUpdateHoaDonModel) {
    this._detailHoaDon = value;
    if (value.iD_HoaDon === 0) {
      //create
      this.titleDialog = "Thêm mới dịch vụ";
      this.loadFormData();
      // this.loadAllNgonNgu();
    } else {
      //update
      this.titleDialog = "Chỉnh sửa " + value.iD_HoaDon + " dịch vụ";
      //load Detail Data
      // this.loadDetailData(this._detailDichVu.iD_DichVu);
    }
  }
  private loadFormData() {
    this.formData = this.fb.group({
      kyHieuNgonNgu: [
        this._detailHoaDon.kyHieuNgonNgu,
        Validators.compose([Validators.required]),
      ],
      iD_HinhThucThanhToan: [
        this._detailHoaDon.iD_HinhThucThanhToan,
        Validators.compose([Validators.required]),
      ],
      gioiTinh: [
        this._detailHoaDon.gioiTinh,
        Validators.compose([Validators.required]),
      ],
      hoTen: [
        this._detailHoaDon.hoTen,
        Validators.compose([Validators.required]),
      ],
      email: [
        this._detailHoaDon.email,
        Validators.compose([Validators.required]),
      ],
      soTienThanhToan: [
        this._detailHoaDon.soTienThanhToan,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      thoiGianDen: [
        this._detailHoaDon.thoiGianDen,
        Validators.compose([Validators.required]),
      ],
      moTa: [
        this._detailHoaDon.moTa,
        Validators.compose([Validators.required]),
      ],
      link: [
        this._detailHoaDon.link,
        Validators.compose([Validators.required]),
      ],
      daPhanHoi: [this._detailHoaDon.daPhanHoi],
      daThanhToan: [this._detailHoaDon.daThanhToan],
    });
    this.validation = new ValidationComponent(this.formData);
  }
}
