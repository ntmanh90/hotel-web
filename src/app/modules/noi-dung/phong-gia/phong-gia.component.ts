import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { isForOfStatement } from "typescript";
import {
  ElementComboboxSelectRangeDate,
  ListPhongGiaModel,
  PhongGiaViewTable,
  SearchPhongGiaModel,
} from "../_models/phong-gia.model";
import { CommonService } from "../_services/common.service";
import { PhongGiaService } from "../_services/phong-gia.service";
import { DialogCaiDatGiaPhongComponent } from "./dialog-cai-dat-gia-phong/dialog-cai-dat-gia-phong.component";
import { DialogDongMoPhongComponent } from "./dialog-dong-mo-phong/dialog-dong-mo-phong.component";

@Component({
  selector: "app-phong-gia",
  templateUrl: "./phong-gia.component.html",
  styleUrls: ["./phong-gia.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhongGiaComponent implements OnInit {
  public elementComboboxSelectRangeDate: ElementComboboxSelectRangeDate[] = [
    { id: 0, viewValue: "1 tuần" },
    { id: 1, viewValue: "1 tháng" },
    { id: 2, viewValue: "2 tháng" },
    { id: 3, viewValue: "3 tháng" },
  ];
  public _searchPhongGia: SearchPhongGiaModel = {
    KhoangNgay: 60,
    idSearch: 1,
    TuNgay: new Date().toLocaleString(),
  };
  public listPhongGia: PhongGiaViewTable[] = [];
  public listPhongGiaModel: ListPhongGiaModel[];
  options: FormGroup;
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private phongGiaService: PhongGiaService,
    private cd: ChangeDetectorRef
  ) {
    this.options = fb.group({
      TuNgay: [new Date(this._searchPhongGia.TuNgay)],
      KhoangNgay: [this._searchPhongGia.idSearch],
    });
    const formValue = this.options.value;
    this.getDay(formValue.TuNgay, formValue.KhoangNgay);
    this.phongGiaService.get_DanhSach(this._searchPhongGia).subscribe((res) => {
      res.forEach((ele) => {
        ele.PhongGiaViewTable = JSON.parse(JSON.stringify(this.listPhongGia));
      });
      this.listPhongGiaModel = res;
      this.updateDataToListModel();
      this.cd.markForCheck();
      console.log(this.listPhongGiaModel);
    });
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
      giaBan: 0,
      giaKhuyenMaiDatPhongVMs: [
        {price: 0},
        {price: 0},
        {price: 0}
      ],
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
        monthData = date.getMonth();
        break;
      case 2:
        // 2 month
        monthData = date.getMonth() + 2;
        break;
      case 3:
        // 3 month
        monthData = date.getMonth() + 3;
        break;
    }
    let i = 1;
    while (date.getMonth() <= monthData) {
      i++;
      this.listPhongGia.push({
        date: new Date(date),
        thu: this.getStringDay(new Date(date).getDay()),
      });
      date.setDate(date.getDate() + 1);
    }
    this._searchPhongGia.KhoangNgay = i;
    return;
  }
  ngOnInit(): void {}
}
