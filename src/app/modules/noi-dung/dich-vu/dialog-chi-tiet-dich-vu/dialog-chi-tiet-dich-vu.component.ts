import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { AvatarUploadFileComponent } from "src/app/modules/shares/upload-file/avatar-upload/avatar-upload.component";
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
import { bgCSS } from "src/app/modules/shares/_models/bgCss.model";
import {
  CreateEditDichVu,
  DichVuRequest,
} from "../../_models/create-edit-dich-vu.model";
import { CommonService } from "../../_services/common.service";
import { DichVuService } from "../../_services/dich-vu.service";

@Component({
  selector: "app-chi-tiet-dich-vu",
  templateUrl: "./dialog-chi-tiet-dich-vu.component.html",
  styleUrls: ["./dialog-chi-tiet-dich-vu.component.scss"],
})
export class ChiTietDichVuComponent implements OnInit {
  public formData;
  public titleDialog = "Thêm mới dịch vụ";
  public dataSourceLanguage: any = new MatTableDataSource();
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
      field: "noiDungTheoNgonNgu",
      title: "Nội dung hiển thị theo ngôn ngữ",
      type: 1,
    },
  ];
  public displayedColumns = [
    "index",
    "tenNgonNgu",
    "tenTheoNgonNgu",
    "noiDungTheoNgonNgu",
  ];
  public _detailDichVu: CreateEditDichVu;
  private subscriptions: Subscription[] = [];
  public listDichVuNgonNguRequest: DichVuRequest[] = [];
  private bgcss = new bgCSS();
  public validation: ValidationComponent;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private commonService: CommonService,
    private dichVuService: DichVuService,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal
  ) {}
  public set data(value: CreateEditDichVu) {
    this._detailDichVu = value;
    if (value.iD_DichVu === -1) {
      //create
      this.titleDialog = "Thêm mới dịch vụ";
      this.loadFormData();
      this.loadAllNgonNgu();
    } else {
      //update
      this.titleDialog = "Chỉnh sửa " + value.tenDichvu + " dịch vụ";
      //load Detail Data
      this.loadDetailData(this._detailDichVu.iD_DichVu);
    }
  }
  private loadDetailData(id) {
    this.loadFormData();
    this.dichVuService.get_ChiTiet_DichVu(id).subscribe((res) => {
      this._detailDichVu = {
        tenDichvu: res.tenDichvu,
        anhDaiDien: res.anhDaiDien,
        giaTheoDemLuuTru: res.giaTheoDemLuuTru,
        giaTheoDichVu: res.giaTheoDichVu,
        giaTheoNguoiLon: res.giaTheoNguoiLon,
        giaTheoTreEm: res.giaTheoTreEm,
        giaTinhTheo: res.giaTinhTheo,
        iD_DichVu: res.iD_DichVu,
        nN_DichVuRequests: [],
        trangThai: res.trangThai,
      };
      for (let index = 0; index < res.nN_DichVuVMs.length; index++) {
        const element = res.nN_DichVuVMs[index];
        this._detailDichVu.nN_DichVuRequests.push({
          iD_NgonNgu: element.iD_NgonNgu,
          tenNgonNgu: element.tenNgonNgu,
          tenTheoNgonNgu: element.tenTheoNgonNgu,
          noiDungTheoNgonNgu: element.noiDungTheoNgonNgu,
        });
      }
      this.loadAllNgonNgu();
    });
  }
  private loadFormData() {
    this.formData = this.fb.group({
      tenDichvu: [
        this._detailDichVu.tenDichvu,
        Validators.compose([Validators.required]),
      ],
      anhDaiDien: [
        this._detailDichVu.anhDaiDien,
        Validators.compose([Validators.required]),
      ],
      giaTinhTheo: [
        this._detailDichVu.giaTinhTheo,
        Validators.compose([Validators.required]),
      ],
      giaTheoDichVu: [
        this._detailDichVu.giaTheoDichVu,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      giaTheoDemLuuTru: [
        this._detailDichVu.giaTheoDemLuuTru,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      giaTheoNguoiLon: [
        this._detailDichVu.giaTheoNguoiLon,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      giaTheoTreEm: [
        this._detailDichVu.giaTheoTreEm,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      trangThai: [this._detailDichVu.trangThai],
    });
    this.validation = new ValidationComponent(this.formData);
  }
  private loadAllNgonNgu() {
    const sb = this.commonService
      .get_DanhSachNgonNgu()
      .subscribe((data: any[]) => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.listDichVuNgonNguRequest.push({
            index: index + 1,
            iD_NgonNgu: element.iD_NgonNgu,
            tenNgonNgu: element.tieuDe,
            noiDungTheoNgonNgu: "",
            tenTheoNgonNgu: "",
          });
        }
        this.dataSourceLanguage.data = this.listDichVuNgonNguRequest;
        if (this._detailDichVu.iD_DichVu !== -1) {
          //update data in list ngon ngu
          for (
            let index = 0;
            index < this.listDichVuNgonNguRequest.length;
            index++
          ) {
            let element = this.listDichVuNgonNguRequest[index];
            for (
              let indexJ = 0;
              indexJ < this._detailDichVu.nN_DichVuRequests.length;
              indexJ++
            ) {
              const elementJ = this._detailDichVu.nN_DichVuRequests[indexJ];
              if (element.iD_NgonNgu === elementJ.iD_NgonNgu) {
                element.noiDungTheoNgonNgu = elementJ.noiDungTheoNgonNgu;
                element.tenTheoNgonNgu = elementJ.tenTheoNgonNgu;
                break;
              }
            }
          }
        }
      });
    this.subscriptions.push(sb);
  }
  public UpdateData(res: { value: any; row: any; field: string }) {
    for (let index = 0; index < this.listDichVuNgonNguRequest.length; index++) {
      let element: any = this.listDichVuNgonNguRequest[index];
      if (element.iD_NgonNgu === res.row.iD_NgonNgu) {
        element[res.field] = res.value;
        break;
      }
    }
  }
  ngOnInit() {}
  public closeDialogNotSaveData(event) {
    this.modal.close(event);
  }
  //gán dữ liệu từ formData vào Object
  private prepareCustomer() {
    const formValue = this.formData.value;
    this._detailDichVu.tenDichvu = formValue.tenDichvu;
    this._detailDichVu.anhDaiDien = formValue.anhDaiDien;
    this._detailDichVu.giaTinhTheo = Number(formValue.giaTinhTheo);
    this._detailDichVu.giaTheoTreEm =
      this._detailDichVu.giaTinhTheo === 2 ? formValue.giaTheoTreEm : 0;
    this._detailDichVu.giaTheoNguoiLon =
      this._detailDichVu.giaTinhTheo === 2 ? formValue.giaTheoNguoiLon : 0;
    this._detailDichVu.giaTheoDichVu =
      this._detailDichVu.giaTinhTheo === 1 ? formValue.giaTheoDichVu : 0;
    this._detailDichVu.giaTheoDemLuuTru =
      this._detailDichVu.giaTinhTheo === 3 ? formValue.giaTheoDemLuuTru : 0;
    this._detailDichVu.trangThai = formValue.trangThai;
    this._detailDichVu.nN_DichVuRequests = this.listDichVuNgonNguRequest;
  }
  public closeDialogSaveData(event) {
    this.prepareCustomer();
    if (this._detailDichVu.iD_DichVu === -1) {
      //create
      const sbCreate = this.dichVuService
        .post_Them_DichVu(this._detailDichVu)
        .subscribe(
          (res: CreateEditDichVu) => {
            if (res) {
              this.modal.close(`Thêm mới ${res.tenDichvu}: ${res.tenDichvu}`);
              return of(res);
            }
          },
          (error) => {
            this.openSnackBar(error, this.bgcss.Error);
          }
        );
      this.subscriptions.push(sbCreate);
    } else {
      //update
      const sbUpdate = this.dichVuService
        .put_Sua_DichVu(this._detailDichVu)
        .subscribe(
          (res: CreateEditDichVu) => {
            if (res) {
              this.modal.close(`Sửa ${res.tenDichvu}: ${res.tenDichvu}`);
              return of(res);
            }
          },
          (error) => {
            this.openSnackBar(error, this.bgcss.Error);
          }
        );
      this.subscriptions.push(sbUpdate);
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
  public onChangeData(value) {
    this._detailDichVu.giaTinhTheo = value;
  }
  public openDialogImage(event) {
    this.modalService.open(AvatarUploadFileComponent, {
      size: "lg",
    });
  }
}
