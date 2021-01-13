import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
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
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private commonService: CommonService,
    private dichVuService: DichVuService,
    private _snackBar: MatSnackBar
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
    this.dichVuService.get_ChiTiet_DichVu(id).subscribe((res) => {
      console.log(res);
      this._detailDichVu = {
        tenDichvu: res.tenDichvu,
        anhDaiDien: res.anhDaiDien,
        giaTheoDemLuuTru: res.giaTheoDemLuuTru,
        giaTheoDichVu: res.giaTheoDichVu,
        giaTheoNguoiLon: res.giaTheoNguoiLon,
        giaTheoTreEm: res.giaTheoTreEm,
        giaTinhTheo: res.giaTinhTheo,
        iD_DichVu: res.iD_DichVu,
        nN_DichVuRequests: [
          {
            iD_NgonNgu : res.iD_NgonNgu,
            tenNgonNgu: res.tenNgonNgu,
            tenTheoNgonNgu: res.tenTheoNgonNgu,
            noiDungTheoNgonNgu: res.noiDungTheoNgonNgu
          }
        ],
        trangThai: res.trangThai
      };
      this.loadFormData();
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
        Validators.compose([Validators.required]),
      ],
      giaTheoDemLuuTru: [
        this._detailDichVu.giaTheoDemLuuTru,
        Validators.compose([Validators.required]),
      ],
      giaTheoNguoiLon: [
        this._detailDichVu.giaTheoNguoiLon,
        Validators.compose([Validators.required]),
      ],
      giaTheoTreEm: [
        this._detailDichVu.giaTheoTreEm,
        Validators.compose([Validators.required]),
      ],
      trangThai: [this._detailDichVu.trangThai],
    });
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
      });
    this.subscriptions.push(sb);
    if (this._detailDichVu.iD_DichVu !== 0) {
      //update data in list ngon ngu
      for (
        let index = 0;
        index < this.listDichVuNgonNguRequest.length;
        index++
      ) {
        const element = this.listDichVuNgonNguRequest[index];
      }
    }
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
    this._detailDichVu.giaTheoTreEm = formValue.giaTheoTreEm;
    this._detailDichVu.giaTheoNguoiLon = formValue.giaTheoNguoiLon;
    this._detailDichVu.giaTheoDichVu = formValue.giaTheoDichVu;
    this._detailDichVu.giaTheoDemLuuTru = formValue.giaTheoDemLuuTru;
    this._detailDichVu.trangThai = formValue.trangThai;
    this._detailDichVu.nN_DichVuRequests = this.listDichVuNgonNguRequest;
  }
  public closeDialogSaveData(event) {
    this.prepareCustomer();
    if (this._detailDichVu.iD_DichVu === 0) {
      //create
      const sbCreate = this.dichVuService
        .post_Them_DichVu(this._detailDichVu)
        .subscribe(
          (res: CreateEditDichVu) => {
            if (res) {
              this.modal.dismiss(`Thêm mới ${res.tenDichvu}: ${res.tenDichvu}`);
              return of(res);
            }
          },
          (error) => {
            this.openSnackBar(error, this.bgcss.Error);
          }
        );
      this.subscriptions.push(sbCreate);
      console.log(this._detailDichVu);
    } else {
      //update
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
}
