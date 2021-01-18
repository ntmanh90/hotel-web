import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { CreateUpdateHoaDonModel } from "../_models/create-update-hoa-don.model";
import { HoaDonService } from "../_services/hoa-don.service";
import { DialogCreateUpdateHoaDonComponent } from "./dialog-create-update-hoa-don/dialog-create-update-hoa-don.component";

@Component({
  selector: "app-hoa-don",
  templateUrl: "./hoa-don.component.html",
  styleUrls: ["./hoa-don.component.scss"],
})
export class HoaDonComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public dataSourceHoaDon: any = new MatTableDataSource();
  public ListColumnDef = [
    {
      id: 0,
      field: "maHoaDon",
      title: "Mã Hóa Đơn",
      type: 4,
    },
    {
      id: 1,
      field: "iD_HinhThucThanhToan",
      title: "Hình thức thanh toán",
    },
    {
      id: 2,
      field: "soTienThanhToan",
      title: "Số tiền thanh toán",
    },
    {
      id: 3,
      field: "thoiGianDen",
      title: "Thời gian đến",
    },
    {
      id: 4,
      field: "daPhanHoi",
      title: "Đã phản hồi",
      type: 3,
    },
    {
      id: 5,
      field: "daThanhToan",
      title: "Đã Thanh toán",
      type: 5,
    },
  ];
  public displayedColumns = [
    "select",
    "maHoaDon",
    "iD_HinhThucThanhToan",
    "soTienThanhToan",
    "thoiGianDen",
    "daPhanHoi",
    "daThanhToan",
    "edit",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public isHiddenButtonDeleteAll: boolean = true;
  private listSelect = [];
  private listData = [];
  constructor(
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,
    private hoaDonService: HoaDonService,
    private route: Router
  ) {}
  ngOnInit() {
    this.loadAllDataHoaDon();
  }
  public openDialogAddAndUpdate(event) {
    const modalRef = this.modalService.open(DialogCreateUpdateHoaDonComponent, {
      size: "lg",
    });
    let data = event;
    if (!isNaN(event)) {
      data = {
        iD_HoaDon: event,
        kyHieuNgonNgu: undefined,
        iD_HinhThucThanhToan: undefined,
        gioiTinh: undefined,
        hoTen: undefined,
        email: undefined,
        soTienThanhToan: undefined,
        thoiGianDen: undefined,
        moTa: undefined,
        link: undefined,
        daPhanHoi: false,
        daThanhToan: false,
      } as CreateUpdateHoaDonModel;
    }
    modalRef.componentInstance.data = data;
    modalRef.closed.subscribe(this.loadAllDataHoaDon);
  }
  private loadAllDataHoaDon = () => {
    const subLoadAllHoaDon = this.hoaDonService
      .get_DanhSach()
      .subscribe((res) => {
        this.dataSourceHoaDon = new MatTableDataSource();
        this.dataSourceHoaDon.data = res;
        this.listData = res;
        this.dataSourceHoaDon.paginator = this.paginator;
        this.dataSourceHoaDon.sort = this.sort;
      });
    this.subscriptions.push(subLoadAllHoaDon);
  };
  public isSelectData(event) {
    this.isHiddenButtonDeleteAll = !event;
  }
  public addDataSelect(listSelect) {
    this.listSelect = listSelect;
  }
  public deleteData(event) {}
  public moveToDetailHoaDon(element) {
    this.route.navigateByUrl("/noi-dung/hoadon/" + element.iD_HoaDon);
  }
  public onChangeSearch(event) {
    console.log(event);
    this.dataSourceHoaDon.data = this.listData.filter((res) => {
      let check = false;
      if (
        !event.startDate &&
        !event.endDate &&
        !event.status &&
        !event.feedBack
      ) {
        check = true;
      }
      if (event.startDate) {
        const dataDate = new Date(res.thoiGianDen);
        check = dataDate >= new Date(event.startDate);
      }
      if (event.endDate) {
        const dataDate = new Date(res.thoiGianDen);
        check = dataDate <= new Date(event.startDate);
      }
      if (event.status !== undefined) {
        console.log(event.status);
        check = res.daThanhToan === event.status;
      }
      if (event.feedBack !== undefined) {
        check = res.daPhanHoi === event.feedBack;
      }
      console.log(check);
      return check;
    });
  }
}
