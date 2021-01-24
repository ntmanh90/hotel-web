import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { XacNhanXoaComponent } from "../../shares/xac-nhan-xoa/xac-nhan-xoa.component";
import { bgCSS } from "../../shares/_models/bgCss.model";
import { DichVuService } from "../_services/dich-vu.service";
import { ChiTietDichVuComponent } from "./dialog-chi-tiet-dich-vu/dialog-chi-tiet-dich-vu.component";
@Component({
  selector: "app-dich-vu",
  templateUrl: "./dich-vu.component.html",
  styleUrls: ["./dich-vu.component.scss"],
})
export class DichVuComponent implements OnInit, OnDestroy {
  public dataSourceDichVu: any = new MatTableDataSource();
  public ListColumnDef = [
    {
      id: 0,
      field: "maDichVu",
      title: "Mã Dịch Vụ",
    },
    {
      id: 1,
      field: "tenDichvu",
      title: "Tên Dịch Vụ",
    },
    {
      id: 2,
      field: "giaTinhTheoMask",
      title: "Giá Tính Theo",
    },
    {
      id: 3,
      field: "gia",
      title: "Giá (VNĐ)",
    },
    {
      id: 4,
      field: "trangThai",
      title: "Trạng Thái",
      type: 2,
    },
  ];
  public displayedColumns = [
    "select",
    "maDichVu",
    "tenDichvu",
    "giaTinhTheoMask",
    "gia",
    "trangThai",
    "edit",
  ];

  private subscriptions: Subscription[] = [];
  private listSelect = [];
  private bgcss = new bgCSS();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public isHiddenButtonDeleteAll: boolean = true;
  constructor(
    private dichVuService: DichVuService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.loadAllDataDichVu();
  }
  // Get Products list
  private loadAllDataDichVu = () => {
    this.spinner.show();
    const sb = this.dichVuService.get_DanhSach().subscribe((data: {}) => {
      this.dataSourceDichVu = new MatTableDataSource();
      this.dataSourceDichVu.data = data;
      this.dataSourceDichVu.paginator = this.paginator;
      this.dataSourceDichVu.sort = this.sort;
      this.selectPrice();
      this.spinner.hide();
    });
    this.subscriptions.push(sb);
  };
  private selectPrice() {
    for (let index = 0; index < this.dataSourceDichVu.data.length; index++) {
      let element = this.dataSourceDichVu.data[index];
      if (element.giaTinhTheo === 1) {
        element.gia = element.giaTheoDichVu;
        element.giaTinhTheoMask = "Dịch vụ";
      }
      if (element.giaTinhTheo === 3) {
        element.gia = element.giaTheoDemLuuTru;
        element.giaTinhTheoMask = "Số đêm lưu trú";
      }
      if (element.giaTinhTheo === 2) {
        element.giaTinhTheoMask = "Người lớn, Trẻ em";
        element.gia =
          "Người lớn =  " +
          element.giaTheoNguoiLon +
          "Trẻ em =" +
          element.giaTheoTreEm;
      }
    }
  }
  public isSelectData(event) {
    this.isHiddenButtonDeleteAll = !event;
  }
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceDichVu.filter = filterValue;
  }
  public openDialogChiTietDichVu(event) {
    const modalRef = this.modalService.open(ChiTietDichVuComponent, {
      size: "lg",
    });
    let data = event;
    if (!isNaN(event)) {
      data = {
        iD_DichVu: event,
        tenDichvu: undefined,
        anhDaiDien: undefined,
        giaTinhTheo: 1,
        giaTheoDichVu: undefined,
        giaTheoDemLuuTru: undefined,
        giaTheoNguoiLon: undefined,
        giaTheoTreEm: undefined,
        trangThai: undefined,
        nN_DichVuRequests: [],
      };
    }
    modalRef.componentInstance.data = data;
    modalRef.closed.subscribe(this.loadAllDataDichVu);
  }
  public deleteData(row) {
    this.deleteOne(row.iD_DichVu);
  }
  public deleteAllData(event) {
    for (let index = 0; index < this.listSelect.length; index++) {
      const element = this.listSelect[index];
      if(index+1 === this.listSelect.length){
        this.callDeleteRow(element.iD_DichVu, element.tenDichvu);
      }else{
        this.callDeleteRow(element.iD_DichVu, element.tenDichvu, true);
      }
    }
  }
  public addDataSelect(listSelect) {
    this.listSelect = listSelect;
  }
  private deleteOne(id: number) {
    var sb = this.dichVuService.get_ChiTiet_DichVu(id).subscribe((res: any) => {
      if (res) {
        const modalRef = this.modalService.open(XacNhanXoaComponent, {
          size: "500",
        });
        modalRef.componentInstance.tieuDe = ` ${res.tenDichvu} `;
        modalRef.result.then(
          (data) => {
            // on close
          },
          (reason) => {
            // on dismiss
            if (reason == "1") {
              this.callDeleteRow(id, res.tenDichvu);
            }
          }
        );
      } else {
        this.openSnackBar(`Dịch vụ không tồn tại!`, this.bgcss.Warning);
      }
    });
    this.subscriptions.push(sb);
  }
  callDeleteRow(id, tenDichvu, isDeleteMore = false) {
    var sb = this.dichVuService.get_xoa(id).subscribe((x: any) => {
      if (x.kq) {
        this.openSnackBar(`Xóa ${tenDichvu} thành công!`, this.bgcss.Success);
        this.loadAllDataDichVu();
      }
    });
    if(!isDeleteMore){
      this.loadAllDataDichVu();
      this.isHiddenButtonDeleteAll = true;
    }
    
    this.subscriptions.push(sb);
  }
  openSnackBar(action, bgCss) {
    this._snackBar.open(action, "x", {
      duration: 2500,
      panelClass: [bgCss],
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
