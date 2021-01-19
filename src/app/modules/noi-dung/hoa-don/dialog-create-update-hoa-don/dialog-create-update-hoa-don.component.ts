import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
import { bgCSS } from "src/app/modules/shares/_models/bgCss.model";
import { CreateUpdateHoaDonModel } from "../../_models/create-update-hoa-don.model";
import { CommonService } from "../../_services/common.service";
import { HoaDonService } from "../../_services/hoa-don.service";

@Component({
  selector: "app-dialog-create-update-hoa-don",
  templateUrl: "./dialog-create-update-hoa-don.component.html",
  styleUrls: ["./dialog-create-update-hoa-don.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DialogCreateUpdateHoaDonComponent implements OnInit, OnDestroy {
  public formData;
  public titleDialog = "Thêm mới hóa đơn";
  public _detailHoaDon: CreateUpdateHoaDonModel;
  public validation: ValidationComponent;
  public editorData = "";
  public startDate = new Date();
  public listNgonNgu: any[] = [];
  private subscriptions: Subscription[] = [];
  public listHinhThucThanhToan: any[] = [];
  private bgcss = new bgCSS();
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private commonService: CommonService,
    private hoaDonService: HoaDonService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  public set data(value: CreateUpdateHoaDonModel) {
    this._detailHoaDon = value;
    if (value.iD_HoaDon === 0) {
      //create
      this.titleDialog = "Thêm mới dịch vụ";
      this.loadDataNeedForForm();
      this.loadFormData();
    } else {
      //update
      this.titleDialog = "Chỉnh sửa " + value.iD_HoaDon + " dịch vụ";
      //load Detail Data
      this.loadDetailData(this._detailHoaDon.iD_HoaDon);
    }
  }
  private loadDetailData(id: number) {
    this.loadDataNeedForForm();
    this.loadFormData();
    const subDetailData = this.hoaDonService
      .get_ChiTiet_HoaDon(id)
      .subscribe((res) => {
        console.log(res);
        this._detailHoaDon = res;
        this.editorData = this._detailHoaDon.moTa;
      });
    this.subscriptions.push(subDetailData);
  }
  private loadDataNeedForForm() {
    const subLoadNgonNgu = this.commonService
      .get_DanhSachNgonNgu()
      .subscribe((res) => {
        this.listNgonNgu = res;
        console.log(res);
      });
    this.subscriptions.push(subLoadNgonNgu);
    const subLoadAllHinhThucThanhToan = this.hoaDonService
      .get_DanhSachHinhThucThanhToan()
      .subscribe((res) => {
        console.log(res);
        this.listHinhThucThanhToan = res;
      });
    this.subscriptions.push(subLoadAllHinhThucThanhToan);
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
  public closeDialogNotSaveData(event) {
    this.modal.close(event);
  }
  public closeDialogSaveData(event) {
    this.prepareCustomer();
    if (this._detailHoaDon.iD_HoaDon === 0) {
      const subCreateHoaDon = this.hoaDonService
        .post_Them_HoaDonLoaiPhong(this._detailHoaDon)
        .subscribe(
          (res: CreateUpdateHoaDonModel) => {
            if (res) {
              this.modal.close(`Thêm mới ${res.iD_HoaDon}: ${res.iD_HoaDon}`);
              return of(res);
            }
          },
          (error) => {
            this.openSnackBar(error, this.bgcss.Error);
          }
        );
      this.subscriptions.push(subCreateHoaDon);
    } else {
      //update
      const updateHoaDon = this.hoaDonService
        .put_Sua_HoaDon(this._detailHoaDon)
        .subscribe(
          (res: CreateUpdateHoaDonModel) => {
            if (res) {
              this.modal.close(`Sửa ${res.iD_HoaDon}: ${res.iD_HoaDon}`);
              return of(res);
            }
          },
          (error) => {
            this.openSnackBar(error, this.bgcss.Error);
          }
        );
    }
  }
  private openSnackBar(action, bgCss) {
    this._snackBar.open(action, "x", {
      duration: 2500,
      panelClass: [bgCss],
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }
  private prepareCustomer() {
    const formValue = this.formData.value;
    this._detailHoaDon.kyHieuNgonNgu = formValue.kyHieuNgonNgu;
    this._detailHoaDon.iD_HinhThucThanhToan = Number(
      formValue.iD_HinhThucThanhToan
    );
    this._detailHoaDon.gioiTinh = formValue.gioiTinh;
    this._detailHoaDon.hoTen = formValue.hoTen;
    this._detailHoaDon.email = formValue.email;
    this._detailHoaDon.soTienThanhToan = Number(formValue.soTienThanhToan);
    this._detailHoaDon.thoiGianDen = formValue.thoiGianDen;
    this._detailHoaDon.moTa = this.editorData;
    this._detailHoaDon.link = formValue.link;
    if (this._detailHoaDon.iD_HoaDon === 0) {
      this._detailHoaDon.daPhanHoi = false;
      this._detailHoaDon.daThanhToan = false;
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
