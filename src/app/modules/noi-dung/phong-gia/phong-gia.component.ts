import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { isForOfStatement } from "typescript";
import {
  CaiDatGiaBanSoLuongTrangThai,
  ElementComboboxSelectRangeDate,
  ENUM_TYPE_UPDATE,
  ListPhongGiaModel,
  PhongGiaViewTable,
  SearchPhongGiaModel,
} from "../_models/phong-gia.model";
import { CommonService } from "../_services/common.service";
import { PhongGiaService } from "../_services/phong-gia.service";
import { DialogCaiDatGiaPhongComponent } from "./dialog-cai-dat-gia-phong/dialog-cai-dat-gia-phong.component";
import { DialogDongMoPhongComponent } from "./dialog-dong-mo-phong/dialog-dong-mo-phong.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-phong-gia",
  templateUrl: "./phong-gia.component.html",
  styleUrls: ["./phong-gia.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhongGiaComponent implements OnInit, OnDestroy {
  public elementComboboxSelectRangeDate: ElementComboboxSelectRangeDate[] = [
    { id: 0, viewValue: "1 tuần" },
    { id: 1, viewValue: "1 tháng" },
    { id: 2, viewValue: "2 tháng" },
    // { id: 3, viewValue: "3 tháng" },
  ];
  public _searchPhongGia: SearchPhongGiaModel;
  public listPhongGia: PhongGiaViewTable[] = [];
  public listPhongGiaModel: ListPhongGiaModel[];
  public options: FormGroup;
  private updateData: Subject<any> = new Subject();
  private subscriptions: Subscription[] = [];
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private phongGiaService: PhongGiaService,
    private cd: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
    this._searchPhongGia = {
      KhoangNgay: 60,
      idSearch: 1,
      TuNgay: this.getDate(new Date().toString()),
    };
    this.options = fb.group({
      TuNgay: [new Date(this._searchPhongGia.TuNgay)],
      KhoangNgay: [this._searchPhongGia.idSearch],
    });
    const searchSubcription = this.updateData
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((objectChange) => {
          return this.updateObjecIntoService(objectChange).pipe(
            map((object) => {
              return object;
            })
          );
        })
      )
      .subscribe((response: any) => {
        if (response.StatusCode === 200) {
          this.getListData();
        }
      });

    const formValue = this.options.value;
    this.getDay(formValue.TuNgay, formValue.KhoangNgay);
    this.getListData();
    this.subscriptions.push(searchSubcription);
  }
  private getDate(date) {
    const today = new Date(date);
    const year = today.getFullYear();
    const mes = today.getMonth() + 1;
    const dia = today.getDate();
    return year + "-" + mes + "-" + dia;
  }
  private updateObjecIntoService(object): Observable<object> {
    if (object) {
      const param = this.getRequestParamData(object);
      return this.phongGiaService.post_CaiDatBanGiaMotNgay(param);
    }
  }
  private getRequestParamData(object): CaiDatGiaBanSoLuongTrangThai {
    let updateData: CaiDatGiaBanSoLuongTrangThai;
    switch (object.keyString) {
      case ENUM_TYPE_UPDATE.GIABAN:
        updateData = {
          iD_LoaiPhong: object.element.data.iD_LoaiPhong,
          iD_CaiDatBanPhong: object.element.data.iD_CaiDatBanPhong
            ? object.element.data.iD_CaiDatBanPhong
            : 0,
          giaBan: Number(object.element.data.giaBan),
          ngayCaiDat: object.element.date,
          type: object.keyString,
        } as CaiDatGiaBanSoLuongTrangThai;
        break;
      case ENUM_TYPE_UPDATE.TRANGTHAI:
        updateData = {
          iD_LoaiPhong: object.element.data.iD_LoaiPhong,
          iD_CaiDatBanPhong: object.element.data.iD_CaiDatBanPhong
            ? object.element.data.iD_CaiDatBanPhong
            : 0,
          trangThai: object.element.data.trangThai,
          ngayCaiDat: object.element.date,
          type: object.keyString,
        } as CaiDatGiaBanSoLuongTrangThai;
        break;
      case ENUM_TYPE_UPDATE.SOLUONG:
        updateData = {
          iD_LoaiPhong: object.element.data.iD_LoaiPhong,
          iD_CaiDatBanPhong: object.element.data.iD_CaiDatBanPhong
            ? object.element.data.iD_CaiDatBanPhong
            : 0,
          soLuong: Number(object.element.data.soLuong),
          ngayCaiDat: object.element.date,
          type: object.keyString,
        } as CaiDatGiaBanSoLuongTrangThai;
        break;
    }
    return updateData;
  }
  public updateDataInService(event) {
    this.updateData.next(event);
  }
  public updateDataInServiceMoreDay(event) {
    const subUpdate = this.phongGiaService
      .post_CaiDatBanGiaNhieuNgay(event)
      .subscribe((response) => {
        if (response.StatusCode === 200) {
          this.getListData();
        }
      });
    this.subscriptions.push(subUpdate);
  }
  public updateDataStatusMoreDay(event: []) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.updateDataInServiceMoreDay(element);
    }
  }
  private getListData() {
    this.spinner.show();
    const searchSubcription = this.phongGiaService
      .get_DanhSach(this._searchPhongGia)
      .subscribe((res) => {
        res.forEach((ele) => {
          ele.PhongGiaViewTable = JSON.parse(JSON.stringify(this.listPhongGia));
        });
        this.listPhongGiaModel = res;
        this.updateDataToListModel();
        this.cd.markForCheck();
        this.spinner.hide();
      });
    this.subscriptions.push(searchSubcription);
  }
  private updateDataToListModel() {
    for (let index = 0; index < this.listPhongGiaModel.length; index++) {
      let element = this.listPhongGiaModel[index];
      if (element.PhongGiaViewTable) {
        element = this.searchDataPhongGiaViewTable(element);
      }
    }
  }
  private searchDataPhongGiaViewTable(elements: ListPhongGiaModel) {
    for (let index = 0; index < elements.PhongGiaViewTable.length; index++) {
      elements.PhongGiaViewTable[index].data = this.getDataInDate(
        elements.PhongGiaViewTable[index].date,
        elements
      );
    }
    return elements;
  }
  public onChangeData(event) {
    const formValue = this.options.value;
    this._searchPhongGia.TuNgay = this.getDate(
      new Date(formValue.TuNgay).toString()
    );
    this._searchPhongGia.idSearch = formValue.KhoangNgay;
    this.getDay(this._searchPhongGia.TuNgay, this._searchPhongGia.idSearch);
    this.getListData();
  }
  private getDataInDate(date, models: ListPhongGiaModel) {
    for (let index = 0; index < models.caiDatBanPhongVMs.length; index++) {
      const element = models.caiDatBanPhongVMs[index];
      const ngayCaiDat = new Date(element.ngayCaiDat);
      const dateSoSanh = new Date(date);
      if (
        ngayCaiDat.getDate() === dateSoSanh.getDate() &&
        ngayCaiDat.getMonth() === dateSoSanh.getMonth() &&
        ngayCaiDat.getFullYear() === dateSoSanh.getFullYear()
      ) {
        return element;
      }
    }
    return {
      iD_LoaiPhong: models.iD_LoaiPhong,
      giaBan: 0,
      giaKhuyenMaiDatPhongVMs: [{ price: 0 }, { price: 0 }, { price: 0 }],
      soLuong: 0,
      trangThai: false,
    };
  }
  private getStringDay(numberDay: number) {
    if (numberDay === 0) {
      return "Thứ bảy";
    }
    return numberDay === 1 ? "Chủ nhật" : "Thứ " + numberDay;
  }
  private getDay(dateData, idSearch) {
    this.listPhongGia = [];
    const date = new Date(dateData);
    let monthData = date.getMonth();
    switch (idSearch) {
      case 0:
        //week
        let i = 0;
        while (i < 7) {
          this.listPhongGia.push({
            date: new Date(date),
            thu: this.getStringDay(new Date(date).getDay()),
          });
          date.setDate(date.getDate() + 1);
        }
        this._searchPhongGia.KhoangNgay = 7;
        return;
      case 1:
      default:
        //month
        monthData = 30;
        break;
      case 2:
        // 2 month
        monthData = 60;
        break;
    }
    for (let index = 0; index < monthData; index++) {
      this.listPhongGia.push({
        date: new Date(date),
        thu: this.getStringDay(new Date(date).getDay()),
      });
      date.setDate(date.getDate() + 1);
    }
    this._searchPhongGia.KhoangNgay = monthData;
    return;
  }
  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
