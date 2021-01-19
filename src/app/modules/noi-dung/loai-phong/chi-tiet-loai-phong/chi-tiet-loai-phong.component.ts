import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { bgCSS } from "src/app/modules/shares/_models/bgCss.model";

import {
  LoaiPhong,
  LoaiPhong_Gallery_Requests,
  LoaiPhong_LoaiGiuong_Requests,
  LoaiPhong_TienIch_Requests,
  nN_LoaiPhongRequests,
} from "../../_models/loai-phong.model";
import { LoaiPhongService } from "../../_services/loai-phong.service";
import { CommonService } from "../../_services/common.service";
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
import { HuongNhin } from "../../_models/huong-nhin.model";
import { MatTableDataSource } from "@angular/material/table";
import { DialogThemThongTinLoaiGuongComponent } from "../dialog-them-thong-tin-loai-guong/dialog-them-thong-tin-loai-guong.component";
import { DialogThemTienIchComponent } from "../dialog-them-tien-ich/dialog-them-tien-ich.component";
@Component({
  selector: "app-chi-tiet-loai-phong",
  templateUrl: "./chi-tiet-loai-phong.component.html",
  styleUrls: ["./chi-tiet-loai-phong.component.scss"],
})
export class ChiTietLoaiPhongComponent implements OnInit, OnDestroy {
  bgcss = new bgCSS();
  formData: FormGroup;
  private subscriptions: Subscription[] = [];
  public titleDialog = "";
  public _detailLoaiPhong: LoaiPhong;
  public validation: ValidationComponent;
  public listDataHuongNhin: HuongNhin[] = [];
  public listLoaiGuong: nN_LoaiPhongRequests[] = [];
  public listTienIch: LoaiPhong_TienIch_Requests[] = [];
  public listSoNguoiToiDa: any[] = [];
  public dataSourceLanguage: any = new MatTableDataSource();
  private listLoaiNgonNguRequest: LoaiPhong_LoaiGiuong_Requests[] = [];
  public loaiPhong_Gallery_Requests: LoaiPhong_Gallery_Requests[] = [
    { url_Gallery: "fsfkdhs" },
  ];
  public ListColumnDef = [
    { id: 0, field: "index", title: "Số thứ tự" },
    { id: 1, field: "tenNgonNgu", title: "Ngôn ngữ" },
    {
      id: 2,
      field: "tenLoaiPhongTheoNgonNgu",
      title: "Tên loại phòng theo ngôn ngữ",
      type: 1,
    },
  ];
  public displayedColumns = ["index", "tenNgonNgu", "tenLoaiPhongTheoNgonNgu"];
  constructor(
    private loaiPhongService: LoaiPhongService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private commonservice: CommonService,
    private _snackBar: MatSnackBar,
    private subModalService: NgbModal
  ) {
    for (let index = 1; index < 11; index++) {
      this.listSoNguoiToiDa.push({
        id: index,
        name: index + "",
      });
    }
  }
  public set data(value: LoaiPhong) {
    this._detailLoaiPhong = value;
    if (value.iD_LoaiPhong === 0) {
      //create
      this.titleDialog = "Thêm mới dịch vụ";
      this.loadFormData();
      this.loadDataNeedForLoaiPhong();
    } else {
      //update
      this.titleDialog = "Chỉnh sửa loại phòng" + value.tenLoaiPhong + "";
      //load Detail Data
      this.loadDetailData(this._detailLoaiPhong.iD_LoaiPhong);
    }
  }
  private loadDetailData(id: number) {
    this.loadDataNeedForLoaiPhong();
    this.loadFormData();
    const subLoadDetail = this.loaiPhongService
      .get_ChiTiet_LoaiPhong(id)
      .subscribe((res) => {
        console.log(res);
        this._detailLoaiPhong = res;
      });
    this.subscriptions.push(subLoadDetail);
  }
  private loadFormData() {
    this.formData = this.fb.group({
      tenLoaiPhong: [
        this._detailLoaiPhong.tenLoaiPhong,
        Validators.compose([Validators.required]),
      ],
      anhDaiDien: [
        this._detailLoaiPhong.anhDaiDien,
        Validators.compose([Validators.required]),
      ],
      kichThuoc: [
        this._detailLoaiPhong.kichThuoc,
        Validators.compose([Validators.required]),
      ],
      iD_HuongNhin: [
        this._detailLoaiPhong.iD_HuongNhin,
        Validators.compose([Validators.required]),
      ],
      treEm: [
        this._detailLoaiPhong.treEm,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      nguoiLon: [
        this._detailLoaiPhong.nguoiLon,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      index: [this._detailLoaiPhong.index],
      maLoaiPhong: [this._detailLoaiPhong.maLoaiPhong],
      trangThai: [this._detailLoaiPhong.trangThai],
    });
    this.validation = new ValidationComponent(this.formData);
  }

  private loadDataNeedForLoaiPhong() {
    const sbHN = this.commonservice
      .get_All_HuongNhin()
      .subscribe((data: HuongNhin[]) => {
        this.listDataHuongNhin = data;
      });
    this.subscriptions.push(sbHN);
    const sbNN = this.commonservice
      .get_DanhSachNgonNgu()
      .subscribe((data: any[]) => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.listLoaiNgonNguRequest.push({
            index: index + 1,
            iD_NgonNgu: element.iD_NgonNgu,
            tenNgonNgu: element.tieuDe,
            tenLoaiPhongTheoNgonNgu: "",
          });
        }
        this.dataSourceLanguage.data = this.listLoaiNgonNguRequest;
      });
    this.subscriptions.push(sbNN);
  }
  public openDialogAddNewTypeRoom(event) {
    const modalRef = this.subModalService.open(
      DialogThemThongTinLoaiGuongComponent,
      { size: "sm" }
    );
    modalRef.closed.subscribe((res) => {
      this.addThongTinLoaiGuong(res);
    });
  }
  public OpenDialogThemTienIch(event) {
    const modalRef = this.subModalService.open(DialogThemTienIchComponent, {
      size: "lg",
    });
    modalRef.closed.subscribe((res) => {
      this.addTienIchInArray(res);
    });
  }
  private addThongTinLoaiGuong(res: nN_LoaiPhongRequests) {
    let checkAdd = true;
    for (let index = 0; index < this.listLoaiGuong.length; index++) {
      let element = this.listLoaiGuong[index];
      if (element.iD_LoaiGiuong === res.iD_LoaiGiuong) {
        element.soLuong += res.soLuong;
        checkAdd = false;
        break;
      }
    }
    if (checkAdd) {
      this.listLoaiGuong.push(res);
    }
  }
  private addTienIchInArray(res) {
    this.listTienIch = res;
  }
  public UpdateData(res: { value: any; row: any; field: string }) {
    for (let index = 0; index < this.listLoaiNgonNguRequest.length; index++) {
      let element: any = this.listLoaiNgonNguRequest[index];
      if (element.iD_NgonNgu === res.row.iD_NgonNgu) {
        element[res.field] = res.value;
        break;
      }
    }
  }
  //gán dữ liệu từ formData vào Object
  private prepareCustomer() {
    const formValue = this.formData.value;
    this._detailLoaiPhong.tenLoaiPhong = formValue.tenLoaiPhong;
    this._detailLoaiPhong.anhDaiDien = formValue.anhDaiDien;
    this._detailLoaiPhong.kichThuoc = formValue.kichThuoc;
    this._detailLoaiPhong.iD_HuongNhin = Number(formValue.iD_HuongNhin);
    this._detailLoaiPhong.nguoiLon = Number(formValue.nguoiLon);
    this._detailLoaiPhong.treEm = Number(formValue.treEm);
    this._detailLoaiPhong.maLoaiPhong = formValue.maLoaiPhong;
    this._detailLoaiPhong.trangThai = formValue.trangThai;
    this._detailLoaiPhong.loaiPhong_LoaiGiuong_Requests = this.listLoaiNgonNguRequest;
    this._detailLoaiPhong.loaiPhong_Gallery_Requests = this.loaiPhong_Gallery_Requests;
    this._detailLoaiPhong.loaiPhong_TienIch_Requests = this.listTienIch;
    this._detailLoaiPhong.nN_LoaiPhongRequests = this.listLoaiGuong;
  }
  public closeDialogSaveData(event) {
    this.prepareCustomer();
    if (this._detailLoaiPhong.iD_LoaiPhong !== 0) {
      this.editLoaiPhong();
    } else {
      this.createLoaiPhong();
    }
  }

  private editLoaiPhong() {
    const sbUpdate = this.loaiPhongService
      .put_Sua_LoaiPhong(this._detailLoaiPhong)
      .subscribe(
        (res: LoaiPhong) => {
          this._detailLoaiPhong = res;
          if (this._detailLoaiPhong.iD_LoaiPhong > 0) {
            this.modal.dismiss(
              `Cập nhật loại phòng: ${this._detailLoaiPhong.tenLoaiPhong}`
            );
            return of(this._detailLoaiPhong);
          }
        },
        (error) => {
          this.openSnackBar(error, this.bgcss.Error);
        }
      );
    this.subscriptions.push(sbUpdate);
  }
  public closeDialogNotSaveData(event) {
    this.modal.close(event);
  }
  private createLoaiPhong() {
    const sbCreate = this.loaiPhongService
      .post_Them_LoaiPhong(this._detailLoaiPhong)
      .subscribe(
        (res: LoaiPhong) => {
          this._detailLoaiPhong = res;
          if (this._detailLoaiPhong) {
            this.modal.dismiss(
              `Thêm mới Loại phòng: ${this._detailLoaiPhong.tenLoaiPhong}`
            );
            return of(this._detailLoaiPhong);
          }
        },
        (error) => {
          this.openSnackBar(error, this.bgcss.Error);
        }
      );
    this.subscriptions.push(sbCreate);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  openSnackBar(action, bgCss) {
    this._snackBar.open(action, "x", {
      duration: 2500,
      panelClass: [bgCss],
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }
}
