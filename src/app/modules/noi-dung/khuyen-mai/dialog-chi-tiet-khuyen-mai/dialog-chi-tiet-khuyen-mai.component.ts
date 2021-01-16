import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
import {
  CreateEditKhuyenMaiModel,
  nN_KhuyenMaiDatPhongRequests,
} from "../../_models/create-edit-khuyen-mai.model";
import { CommonService } from "../../_services/common.service";

@Component({
  selector: "app-dialog-chi-tiet-khuyen-mai",
  templateUrl: "./dialog-chi-tiet-khuyen-mai.component.html",
  styleUrls: ["./dialog-chi-tiet-khuyen-mai.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DialogChiTietKhuyenMaiComponent implements OnInit {
  public titleDialog = "Thêm mới khuyến mãi đặt phòng";
  public formData;
  public validation: ValidationComponent;
  public _detailKhuyenMai: CreateEditKhuyenMaiModel;
  private subscriptions: Subscription[] = [];
  public displayedColumns = [
    "index",
    "tenNgonNgu",
    "tenTheoNgonNgu",
    "dieuKhoan_DieuKien",
  ];
  public ListColumnDef = [
    { id: 0, field: "index", title: "Số thứ tự" },
    { id: 1, field: "tenNgonNgu", title: "Ngôn ngữ" },
    {
      id: 2,
      field: "tenTheoNgonNgu",
      title: "Tên hiển thị theo ngôn ngữ",
      type: 1,
    },
    {
      id: 3,
      field: "dieuKhoan_DieuKien",
      title: "Điều khoản và điểu kiện hiển thị theo ngôn ngữ",
      type: 1,
    },
  ];
  public dataSourceLanguage: any = new MatTableDataSource();
  public listNgonNguHienThi: nN_KhuyenMaiDatPhongRequests[] = [];
  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private commonService: CommonService
  ) {
    this._detailKhuyenMai = {
      iD_KhuyenMaiDatPhong: 0,
      tenKhuyenMaiDatPhong: undefined,
      soNgayLuuTruToiThieu: undefined,
      soNgayDatTruoc: undefined,
      giaCongThem: undefined,
      phanTramGiamGia: undefined,
      phanTramDatCoc: undefined,
      baoGomAnSang: false,
      duocPhepHuy: false,
      duocPhepThayDoi: false,
      ngayBatDau: new Date().toDateString(),
      ngayKetThuc: new Date().toDateString(),
      tatCaNgayTrongTuan: false,
      thuHai: false,
      thuBa: false,
      thuTu: false,
      thuNam: false,
      thuSau: false,
      thuBay: false,
      chuNhat: false,
      trangThai: true,
      index: 0,
      nN_KhuyenMaiDatPhongRequests: [],
      loaiPhong_KhuyenMaiDatPhongVMs: [],
    };
  }

  ngOnInit() {
    this.loadFormData();
    this.loadAllDataLoaiPhong();
    this.loadAllDataNgonNgu();
  }
  private loadFormData() {
    this.formData = this.fb.group({
      tenKhuyenMaiDatPhong: [
        this._detailKhuyenMai.tenKhuyenMaiDatPhong,
        Validators.compose([Validators.required]),
      ],
      soNgayLuuTruToiThieu: [
        this._detailKhuyenMai.soNgayLuuTruToiThieu,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      soNgayDatTruoc: [
        this._detailKhuyenMai.soNgayDatTruoc,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      giaCongThem: [
        this._detailKhuyenMai.giaCongThem,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      phanTramGiamGia: [
        this._detailKhuyenMai.phanTramGiamGia,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      phanTramDatCoc: [
        this._detailKhuyenMai.phanTramDatCoc,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      baoGomAnSang: [this._detailKhuyenMai.baoGomAnSang],
      duocPhepHuy: [this._detailKhuyenMai.duocPhepHuy],
      duocPhepThayDoi: [this._detailKhuyenMai.duocPhepThayDoi],
      ngayBatDau: [
        new Date(this._detailKhuyenMai.ngayBatDau),
        Validators.compose([Validators.required]),
      ],
      ngayKetThuc: [
        new Date(this._detailKhuyenMai.ngayKetThuc),
        Validators.compose([Validators.required]),
      ],
      index: [
        this._detailKhuyenMai.index,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      tatCaNgayTrongTuan: [this._detailKhuyenMai.tatCaNgayTrongTuan],
      thuHai: [this._detailKhuyenMai.thuHai],
      thuBa: [this._detailKhuyenMai.thuBa],
      thuTu: [this._detailKhuyenMai.thuTu],
      thuNam: [this._detailKhuyenMai.thuNam],
      thuSau: [this._detailKhuyenMai.thuSau],
      thuBay: [this._detailKhuyenMai.thuBay],
      chuNhat: [this._detailKhuyenMai.chuNhat],
      trangThai: [this._detailKhuyenMai.trangThai],
    });
    this.validation = new ValidationComponent(this.formData);
  }
  public closeDialogNotSaveData(event) {
    this.modal.close(event);
  }
  private endDateAfterOrEqualValidator(formGroup): any {
    var startDateTimestamp, endDateTimestamp;
    for (var controlName in formGroup.controls) {
      if (controlName.indexOf("ngayBatDau") !== -1) {
        startDateTimestamp = Date.parse(formGroup.controls[controlName].value);
      }
      if (controlName.indexOf("ngayKetThuc") !== -1) {
        endDateTimestamp = Date.parse(formGroup.controls[controlName].value);
      }
    }
    return endDateTimestamp < startDateTimestamp
      ? { endDateLessThanStartDate: true }
      : null;
  }
  private loadAllDataLoaiPhong() {
    const subLoadAllLoaiPhong = this.commonService
      .get_DanhSachLoaiPhong()
      .subscribe((res) => {
        console.log(res);
      });
    this.subscriptions.push(subLoadAllLoaiPhong);
  }
  private loadAllDataNgonNgu() {
    const subLoadAllDataNgonNgu = this.commonService
      .get_DanhSachNgonNgu()
      .subscribe((res) => {
        console.log(res);
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          this.listNgonNguHienThi.push({
            index: index + 1,
            iD_NgonNgu: element.iD_NgonNgu,
            tenTheoNgonNgu: "",
            dieuKhoan_DieuKien: "",
            tenNgonNgu: element.tieuDe,
          });
        }
        this.dataSourceLanguage.data = this.listNgonNguHienThi;
      });
    this.subscriptions.push(subLoadAllDataNgonNgu);
  }
  public closeDialogSaveData(event) {
    this.prepareCustomer();
    if (this._detailKhuyenMai.iD_KhuyenMaiDatPhong === -1) {
    }
  }
  private prepareCustomer() {
    const formValue = this.formData.value;
    this._detailKhuyenMai.tenKhuyenMaiDatPhong = formValue.tenKhuyenMaiDatPhong;
    this._detailKhuyenMai.soNgayDatTruoc = Number(formValue.soNgayDatTruoc);
    this._detailKhuyenMai.soNgayLuuTruToiThieu = Number(
      formValue.soNgayLuuTruToiThieu
    );
    this._detailKhuyenMai.giaCongThem = Number(formValue.giaCongThem);
    this._detailKhuyenMai.phanTramGiamGia = Number(formValue.phanTramGiamGia);
    this._detailKhuyenMai.phanTramDatCoc = Number(formValue.phanTramDatCoc);
    this._detailKhuyenMai.baoGomAnSang = formValue.baoGomAnSang;
    this._detailKhuyenMai.duocPhepHuy = formValue.duocPhepHuy;
    this._detailKhuyenMai.duocPhepThayDoi = formValue.duocPhepThayDoi;
    this._detailKhuyenMai.ngayBatDau = formValue.ngayBatDau;
    this._detailKhuyenMai.ngayKetThuc = formValue.ngayKetThuc;
    this._detailKhuyenMai.tatCaNgayTrongTuan = formValue.tatCaNgayTrongTuan;
    this._detailKhuyenMai.thuHai = formValue.thuHai;
    this._detailKhuyenMai.thuBa = formValue.thuBa;
    this._detailKhuyenMai.thuTu = formValue.thuTu;
    this._detailKhuyenMai.thuNam = formValue.thuNam;
    this._detailKhuyenMai.thuSau = formValue.thuSau;
    this._detailKhuyenMai.thuBay = formValue.thuBay;
    this._detailKhuyenMai.chuNhat = formValue.chuNhat;
    this._detailKhuyenMai.index = Number(formValue.index);
    this._detailKhuyenMai.trangThai = formValue.trangThai;
  }
}
