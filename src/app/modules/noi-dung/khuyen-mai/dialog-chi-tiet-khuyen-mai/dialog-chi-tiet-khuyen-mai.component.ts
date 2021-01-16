import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
import { bgCSS } from "src/app/modules/shares/_models/bgCss.model";
import {
  CreateEditKhuyenMaiModel,
  loaiPhong_KhuyenMaiDatPhongVMs,
  nN_KhuyenMaiDatPhongRequests,
} from "../../_models/create-edit-khuyen-mai.model";
import { CommonService } from "../../_services/common.service";
import { KhuyenMaiService } from "../../_services/khuyen-mai.service";

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
  public listDataNumberOfDate = [];
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
  public listLoaiPhongKhuyenMai: loaiPhong_KhuyenMaiDatPhongVMs[] = [];
  private bgcss = new bgCSS();
  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private commonService: CommonService,
    private khuyenMaiSevice: KhuyenMaiService,
    private _snackBar: MatSnackBar
  ) {
    for (let index = 1; index <= 60; index++) {
      this.listDataNumberOfDate.push(index);
    }
  }

  ngOnInit() {
  }
  public set data(value: CreateEditKhuyenMaiModel) {
    this._detailKhuyenMai = value;
    if (value.iD_KhuyenMaiDatPhong === 0) {
      //create
      this.titleDialog = "Thêm mới dịch vụ";
      this.loadFormData();
      this.loadAllDataLoaiPhong();
      this.loadAllDataNgonNgu();
    } else {
      this._detailKhuyenMai.index = 0;
      //update
      this.titleDialog = "Chỉnh sửa " + value.tenKhuyenMaiDatPhong + " dịch vụ";
      //load Detail Data
      this.loadDetailData(value.iD_KhuyenMaiDatPhong);
    }
  }
  private loadFormData() {
    this.formData = this.fb.group({
      tenKhuyenMaiDatPhong: [
        this._detailKhuyenMai.tenKhuyenMaiDatPhong,
        Validators.compose([Validators.required]),
      ],
      soNgayLuuTruToiThieu: [
        this._detailKhuyenMai.soNgayLuuTruToiThieu,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      soNgayDatTruoc: [
        this._detailKhuyenMai.soNgayDatTruoc,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      giaCongThem: [
        this._detailKhuyenMai.giaCongThem,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      phanTramGiamGia: [
        this._detailKhuyenMai.phanTramGiamGia,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(100)]),
      ],
      phanTramDatCoc: [
        this._detailKhuyenMai.phanTramDatCoc,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(100)]),
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
  private loadDetailData(id: number){
    this.loadFormData();
    const subDetailData = this.khuyenMaiSevice.get_ChiTiet_KhuyenMai(id).subscribe(res => {
      console.log(res);
      this._detailKhuyenMai = res;
      this.loadAllDataLoaiPhong();
      this.loadAllDataNgonNgu();
    });
    this.subscriptions.push(subDetailData);
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
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          this.listLoaiPhongKhuyenMai.push({
            iD_LoaiPhong: element.iD_LoaiPhong,
            daChon: false,
            tenLoaiPhong: element.tenLoaiPhong,
          });
        }
      });
    this.subscriptions.push(subLoadAllLoaiPhong);
  }
  private loadAllDataNgonNgu() {
    const subLoadAllDataNgonNgu = this.commonService
      .get_DanhSachNgonNgu()
      .subscribe((res) => {
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
        if (this._detailKhuyenMai.iD_KhuyenMaiDatPhong !== 0) {
          //update data in list ngon ngu
          for (
            let index = 0;
            index < this.listNgonNguHienThi.length;
            index++
          ) {
            let element = this.listNgonNguHienThi[index];
            for (
              let indexJ = 0;
              indexJ < this._detailKhuyenMai.nN_KhuyenMaiDatPhongVMs.length;
              indexJ++
            ) {
              const elementJ = this._detailKhuyenMai.nN_KhuyenMaiDatPhongVMs[indexJ];
              if (element.iD_NgonNgu === elementJ.iD_NgonNgu) {
                element.dieuKhoan_DieuKien = elementJ.dieuKhoan_DieuKien;
                element.tenTheoNgonNgu = elementJ.tenTheoNgonNgu;
                break;
              }
            }
          }
        }
      });
    this.subscriptions.push(subLoadAllDataNgonNgu);
  }
  public closeDialogSaveData(event) {
    this.prepareCustomer();
    if (this._detailKhuyenMai.iD_KhuyenMaiDatPhong === 0) {
      const subCreateKhuyenMai = this.khuyenMaiSevice
        .post_Them_KhuyenMaiLoaiPhong(this._detailKhuyenMai)
        .subscribe(
          (res: CreateEditKhuyenMaiModel) => {
            if (res) {
              this.modal.close(
                `Thêm mới ${res.tenKhuyenMaiDatPhong}: ${res.tenKhuyenMaiDatPhong}`
              );
              return of(res);
            }
          },
          (error) => {
            this.openSnackBar(error, this.bgcss.Error);
          }
        );
        this.subscriptions.push(subCreateKhuyenMai);
    }
  }
  openSnackBar(action, bgCss) {
    this._snackBar.open(action, "x", {
      duration: 2500,
      panelClass: [bgCss],
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
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
    this._detailKhuyenMai.loaiPhong_KhuyenMaiDatPhongVMs = this.listLoaiPhongKhuyenMai;
    this._detailKhuyenMai.nN_KhuyenMaiDatPhongRequests = this.listNgonNguHienThi;
  }
  public onClickData = (value, row: loaiPhong_KhuyenMaiDatPhongVMs) => {
    for (let index = 0; index < this.listLoaiPhongKhuyenMai.length; index++) {
      let element = this.listLoaiPhongKhuyenMai[index];
      if (element.iD_LoaiPhong === row.iD_LoaiPhong) {
        element.daChon = Boolean(value);
        break;
      }
    }
  };
  public UpdateData = (res: { value: any; row: any; field: string }) => {
    for (let index = 0; index < this.listNgonNguHienThi.length; index++) {
      let element: any = this.listNgonNguHienThi[index];
      if (element.iD_NgonNgu === res.row.iD_NgonNgu) {
        element[res.field] = res.value;
        break;
      }
    }
  };
}
