import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, first } from "rxjs/operators";
import { bgCSS } from "src/app/modules/shares/_models/bgCss.model";

import { LoaiPhong } from "../../_models/loai-phong.model";
import { LoaiPhongService } from "../../_services/loai-phong.service";
import { CommonService } from "../../_services/common.service";
import { HuongNhin } from "../../_models/huong-nhin.model";
import { LoaiGiuong } from "../../_models/loai-giuong.model";
import { SoNguoiToiDa } from "../../_models/so-nguoi-toi-da.model";
import { DialogThemThongTinLoaiGuongComponent } from "../dialog-them-thong-tin-loai-guong/dialog-them-thong-tin-loai-guong.component";
import { DialogThemTienIchComponent } from "../dialog-them-tien-ich/dialog-them-tien-ich.component";
import { TienIchMask } from "../../_models/tien-ich-mask.model";
import { TienIch } from "../../_models/tien-ich.model";
import { LoaiGuongVaSoluong } from "../../_models/loai-guong-so-luong.model";
import { LoaiNgonNguHienThi } from "../../_models/loai-ngon-ngu-hien-thi.model";
import { NgonNgu } from "src/app/modules/danh-muc/_module/ngonngu.model";
import { JSONTaoMoiPhong } from "../../_models/json-tao-moi-phong.model";

const emptyLoaiPhong: LoaiPhong = {
  anhDaiDien: "",
  createBy: "",
  createDate: undefined,
  iD_LoaiPhong: undefined,
  kichThuoc: 0,
  maLoaiPhong: "",
  modifyBy: "",
  modifyDate: undefined,
  tenLoaiPhong: "",
  iD_HuongNhin: undefined,
  id_SoNguoiToiDaNguoiLon: 0,
  id_SoNguoiToiDaTreEm: 0,
  trangThai: true,
  nN_ObjectRequests: [],
  loaiPhong_Gallery_Requests: [],
  loaiPhong_LoaiGiuong_Request: [],
  loaiPhong_TienIch_Request: [],
};

@Component({
  selector: "app-chi-tiet-loai-phong",
  templateUrl: "./chi-tiet-loai-phong.component.html",
  styleUrls: ["./chi-tiet-loai-phong.component.scss"],
})
export class ChiTietLoaiPhongComponent implements OnInit, OnDestroy {
  @Input() id: number;
  tieuDe = "loại phòng";
  isLoading$;
  loaiPhong: LoaiPhong;
  formData: FormGroup;
  tenTrangThai = "Hoạt động";
  private subscriptions: Subscription[] = [];
  bgcss = new bgCSS();
  loaiGiuongs = [];
  soNguoiToiDas = [];
  tienIchs = [];
  huongNhins: HuongNhin[];
  listTienIchMask: TienIchMask[] = [];
  public listLoaiGuongVaSoluong: LoaiGuongVaSoluong[] = [];
  public listNgonNguHienThi: LoaiNgonNguHienThi[] = [];
  constructor(
    private loaiPhongService: LoaiPhongService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private commonservice: CommonService,
    private _snackBar: MatSnackBar,
    private subModalService: NgbModal
  ) {
    for (let index = 1; index < 11; index++) {
      this.soNguoiToiDas.push({
        id: index,
        name: index + "",
      });
    }
  }
  loadDataFormObject(): void {
    if (this.loaiPhong && this.loaiPhong.iD_LoaiPhong !== 0) {
      // load data edit
      this.listNgonNguHienThi = [];
      for (
        let index = 0;
        index < this.loaiPhong.nN_LoaiPhongVMs.length;
        index++
      ) {
        const element = this.loaiPhong.nN_LoaiPhongVMs[index];
        this.listNgonNguHienThi.push({
          idNgonNgu: element.iD_NgonNgu,
          tenNgonNgu: element.tenNgonNgu,
          tieude: element.tenLoaiPhongTheoNgonNgu,
        });
      }
      this.listTienIchMask = [];
      for (
        let index = 0;
        index < this.loaiPhong.loaiPhong_TienIchVMs.length;
        index++
      ) {
        const element = this.loaiPhong.loaiPhong_TienIchVMs[index];
        this.listTienIchMask.push({
          id: element.iD_TienIch,
          name: element.tenTienIch,
          check: true,
        });
      }
      this.listLoaiGuongVaSoluong = [];
      for (
        let index = 0;
        index < this.loaiPhong.loaiPhong_LoaiGiuongVMs.length;
        index++
      ) {
        const element = this.loaiPhong.loaiPhong_LoaiGiuongVMs[index];
        this.listLoaiGuongVaSoluong.push({
          id: element.iD_LoaiGiuong,
          name: element.tenLoaiGiuong,
          soLuong: 1,
        });
      }
      this.loaiPhong.id_SoNguoiToiDaNguoiLon = this.loaiPhong.nguoiLon;
      this.loaiPhong.id_SoNguoiToiDaTreEm = this.loaiPhong.treEm;
    }
    console.log(this.loaiPhong);
  }

  loadForm() {
    this.formData = this.fb.group({
      tenLoaiPhong: [
        this.loaiPhong.tenLoaiPhong,
        Validators.compose([Validators.required]),
      ],
      maLoaiPhong: [
        this.loaiPhong.tenLoaiPhong,
        Validators.compose([Validators.required]),
      ],
      anhDaiDien: [
        this.loaiPhong.anhDaiDien,
        Validators.compose([Validators.required]),
      ],
      kichThuoc: [
        this.loaiPhong.kichThuoc,
        Validators.compose([Validators.required]),
      ],
      iD_HuongNhin: [
        this.loaiPhong.iD_HuongNhin,
        Validators.compose([Validators.required]),
      ],
      id_SoNguoiToiDaNguoiLon: [
        this.loaiPhong.id_SoNguoiToiDaNguoiLon,
        Validators.compose([Validators.required]),
      ],
      id_SoNguoiToiDaTreEm: [
        this.loaiPhong.id_SoNguoiToiDaTreEm,
        Validators.compose([Validators.required]),
      ],
      trangThai: [this.loaiPhong.trangThai],
    });
  }

  loadData() {
    const sb = this.loaiPhongService
      .get_ChiTiet_LoaiPhong(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(emptyLoaiPhong);
        })
      )
      .subscribe((data: LoaiPhong) => {
        this.loaiPhong = data;
        console.log(this.loaiPhong);

        const sbHN = this.commonservice
          .get_All_HuongNhin()
          .subscribe((data: HuongNhin[]) => {
            this.huongNhins = data;
            console.log(this.huongNhins);
          });
        this.subscriptions.push(sbHN);

        const sbLG = this.commonservice
          .get_All_LoaiGiuong()
          .subscribe((data: LoaiGiuong[]) => {
            this.loaiGiuongs = data;
          });
        this.subscriptions.push(sbLG);

        const sbTI = this.commonservice
          .get_All_TienIch()
          .subscribe((data: TienIch[]) => {
            this.tienIchs = data;
          });

        this.subscriptions.push(sbTI);
        if (!this.loaiPhong.iD_LoaiPhong) {
          const sbNN = this.commonservice
            .get_All_NgonNgu()
            .subscribe((data: NgonNgu[]) => {
              data.forEach((ele) => {
                this.listNgonNguHienThi.push({
                  idNgonNgu: ele.iD_NgonNgu,
                  tenNgonNgu: ele.tieuDe,
                });
              });
            });
          this.subscriptions.push(sbNN);
        }
        this.loadDataFormObject();
        this.loadForm();
      });
    this.subscriptions.push(sb);
  }

  //gán dữ liệu từ formData vào Object
  private prepareCustomer() {
    const formValue = this.formData.value;
    this.loaiPhong.tenLoaiPhong = formValue.tenLoaiPhong;
    this.loaiPhong.anhDaiDien = formValue.anhDaiDien;
    this.loaiPhong.kichThuoc = formValue.kichThuoc;
    this.loaiPhong.iD_HuongNhin = formValue.iD_HuongNhin;
    this.loaiPhong.id_SoNguoiToiDaTreEm = formValue.id_SoNguoiToiDaTreEm;
    this.loaiPhong.id_SoNguoiToiDaNguoiLon = formValue.id_SoNguoiToiDaNguoiLon;
    this.loaiPhong.trangThai = formValue.trangThai;
    this.loaiPhong.maLoaiPhong = formValue.maLoaiPhong;
  }
  resetObject() {
    (emptyLoaiPhong.anhDaiDien = ""),
      (emptyLoaiPhong.createBy = ""),
      (emptyLoaiPhong.createDate = undefined),
      (emptyLoaiPhong.iD_LoaiPhong = undefined),
      (emptyLoaiPhong.kichThuoc = 0),
      (emptyLoaiPhong.maLoaiPhong = ""),
      (emptyLoaiPhong.modifyBy = ""),
      (emptyLoaiPhong.modifyDate = undefined),
      (emptyLoaiPhong.tenLoaiPhong = ""),
      (emptyLoaiPhong.iD_HuongNhin = undefined),
      (emptyLoaiPhong.id_SoNguoiToiDaNguoiLon = 0),
      (emptyLoaiPhong.id_SoNguoiToiDaTreEm = 0),
      (emptyLoaiPhong.trangThai = true),
      (emptyLoaiPhong.nN_ObjectRequests = []),
      (emptyLoaiPhong.loaiPhong_Gallery_Requests = []),
      (emptyLoaiPhong.loaiPhong_LoaiGiuong_Request = []),
      (emptyLoaiPhong.loaiPhong_TienIch_Request = []);
  }

  save() {
    this.prepareCustomer();
    if (this.loaiPhong.iD_LoaiPhong) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const param: JSONTaoMoiPhong = this.createJsonData();
    const sbUpdate = this.loaiPhongService
      .put_Sua_LoaiPhong(param)
      .subscribe(
        (res: JSONTaoMoiPhong) => {
          // this.loaiPhong = res;
          if (res.iD_LoaiPhong > 0) {
            this.modal.dismiss(
              `Cập nhật ${this.tieuDe}: ${this.loaiPhong.tenLoaiPhong}`
            );
            this.resetObject();
            return of(this.loaiPhong);
          }
        },
        (error) => {
          this.openSnackBar(error, this.bgcss.Error);
        }
      );
    this.subscriptions.push(sbUpdate);
  }
  private createJsonData(): JSONTaoMoiPhong {
    let param = {
      iD_LoaiPhong: this.loaiPhong.iD_LoaiPhong,
      iD_HuongNhin: Number(this.loaiPhong.iD_HuongNhin),
      nguoiLon: Number(this.loaiPhong.id_SoNguoiToiDaNguoiLon),
      treEm: Number(this.loaiPhong.id_SoNguoiToiDaTreEm),
      maLoaiPhong: this.loaiPhong.maLoaiPhong,
      tenLoaiPhong: this.loaiPhong.tenLoaiPhong,
      anhDaiDien: this.loaiPhong.anhDaiDien,
      kichThuoc: this.loaiPhong.kichThuoc + "",
      trangThai: this.loaiPhong.trangThai,
      nN_LoaiPhongRequests: [],
      loaiPhong_LoaiGiuong_Requests: [],
      loaiPhong_TienIch_Requests: [],
      loaiPhong_Gallery_Requests: [
        {
          url_Gallery: "abc abc",
        },
      ],
    };
    for (let index = 0; index < this.listNgonNguHienThi.length; index++) {
      const element = this.listNgonNguHienThi[index];
      param.nN_LoaiPhongRequests.push({
        iD_NgonNgu: element.idNgonNgu,
        tenLoaiPhongTheoNgonNgu: element.tieude,
      });
    }
    for (let index = 0; index < this.listLoaiGuongVaSoluong.length; index++) {
      const element = this.listLoaiGuongVaSoluong[index];
      param.loaiPhong_LoaiGiuong_Requests.push({
        iD_LoaiGiuong: element.id,
      });
    }
    for (let index = 0; index < this.listTienIchMask.length; index++) {
      const element = this.listTienIchMask[index];
      param.loaiPhong_TienIch_Requests.push({
        iD_TienIch: element.id,
      });
    }
    console.log(param);
    return param;
  }
  create() {
    const param: JSONTaoMoiPhong = this.createJsonData();
    const sbCreate = this.loaiPhongService.post_Them_LoaiPhong(param).subscribe(
      (res: JSONTaoMoiPhong) => {
        if (res) {
          this.modal.dismiss(
            `Thêm mới ${this.tieuDe}: ${this.loaiPhong.tenLoaiPhong}`
          );
          this.resetObject();
          return of(this.loaiPhong);
        }
      },
      (error) => {
        this.openSnackBar(error, this.bgcss.Error);
      }
    );

    this.subscriptions.push(sbCreate);
  }

  ngOnInit() {
    this.isLoading$ = this.loaiPhongService.isLoading$;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  getTenTrangThai(): void {
    if (this.formData.value.trangThai) {
      this.tenTrangThai = "Hoạt động";
    } else {
      this.tenTrangThai = "Khóa";
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

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formData.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formData.controls[controlName];
    return control.dirty || control.touched;
  }

  public openDialogThemThongTinLoaiGuong(event) {
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
  private addTienIchInArray(res: TienIchMask[]) {
    this.listTienIchMask = res;
  }
  private addThongTinLoaiGuong(res: LoaiGuongVaSoluong) {
    let checkAdd = true;
    for (let index = 0; index < this.listLoaiGuongVaSoluong.length; index++) {
      let element = this.listLoaiGuongVaSoluong[index];
      if (element.id === res.id) {
        element.soLuong += res.soLuong;
        checkAdd = false;
        break;
      }
    }
    if (checkAdd) {
      this.listLoaiGuongVaSoluong.push(res);
    }
  }
  deleteLoaiGuong(id) {
    for (let index = 0; index < this.listLoaiGuongVaSoluong.length; index++) {
      const element = this.listLoaiGuongVaSoluong[index];
      if (element.id === id) {
        this.listLoaiGuongVaSoluong.splice(index, 1);
        break;
      }
    }
  }
}
