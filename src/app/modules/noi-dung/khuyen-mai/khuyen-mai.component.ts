import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { AvatarUploadFileComponent } from "../../shares/upload-file/avatar-upload/avatar-upload.component";
import { XacNhanXoaComponent } from "../../shares/xac-nhan-xoa/xac-nhan-xoa.component";
import { bgCSS } from "../../shares/_models/bgCss.model";
import { KhuyenMaiService } from "../_services/khuyen-mai.service";
import { DialogChiTietKhuyenMaiComponent } from "./dialog-chi-tiet-khuyen-mai/dialog-chi-tiet-khuyen-mai.component";

@Component({
  selector: "app-khuyen-mai",
  templateUrl: "./khuyen-mai.component.html",
  styleUrls: ["./khuyen-mai.component.scss"],
})
export class KhuyenMaiComponent implements OnInit, OnDestroy {
  public isHiddenButtonDeleteAll: boolean = true;
  public displayedColumns = [
    "select",
    "maKhuyenMaiDatPhong",
    "tenKhuyenMaiDatPhong",
    // "baoGomAnSang",
    // "duocPhepHuy",
    // "duocPhepThayDoi",
    "phanTramDatCoc",
    "phanTramGiamGia",
    "giaCongThem",
    "soNgayDatTruoc",
    "soNgayLuuTruToiThieu",
    "ngayBatDau",
    "ngayKetThuc",
    "trangThai",
    "edit",
  ];
  public dataSourceKhuyenMai: any = new MatTableDataSource();
  private listSelect = [];
  private bgcss = new bgCSS();
  constructor(
    private khuyenMaiService: KhuyenMaiService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}
  public ListColumnDef = [
    {
      field: "maKhuyenMaiDatPhong",
      title: "Mã khuyến mãi đặt phòng",
    },
    {
      field: "tenKhuyenMaiDatPhong",
      title: "Tên Mã Khuyến Mãi",
    },
    {
      field: "baoGomAnSang",
      title: "Bao gồm ăn sáng",
    },
    {
      field: "duocPhepHuy",
      title: "Được phép hủy",
    },
    {
      field: "duocPhepThayDoi",
      title: "Được phép thay đổi",
    },
    {
      field: "phanTramDatCoc",
      title: "Cọc trước",
    },
    {
      field: "phanTramGiamGia",
      title: "Giảm giá",
    },
    {
      field: "giaCongThem",
      title: "Giá cộng thêm",
    },
    {
      field: "soNgayDatTruoc",
      title: "Số ngày đặt trước",
    },
    {
      field: "soNgayLuuTruToiThieu",
      title: "Số ngày lưu trữ tối thiểu",
    },
    {
      field: "ngayBatDau",
      title: "Ngày bắt đầu",
      type: 6
    },
    {
      field: "ngayKetThuc",
      title: "Ngày kết thúc",
      type: 6
    },
    {
      field: "trangThai",
      title: "Trạng Thái",
      type: 2,
    },
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private subscriptions: Subscription[] = [];
  ngOnInit() {
    this.loadAllDataKhuyenMai();
  }
  private loadAllDataKhuyenMai = () => {
    this.spinner.show();
    const sb = this.khuyenMaiService.get_DanhSach().subscribe((res) => {
      this.dataSourceKhuyenMai = new MatTableDataSource();
      this.dataSourceKhuyenMai.data = res;
      this.dataSourceKhuyenMai.paginator = this.paginator;
      this.dataSourceKhuyenMai.sort = this.sort;
      this.spinner.show();
    });
    this.subscriptions.push(sb);
  };
  public openDialogChiTietKhuyenMai(event) {
    const modalRef = this.modalService.open(DialogChiTietKhuyenMaiComponent, {
      size: "lg",
    });
    let data = event;
    if (!isNaN(event)) {
      data = {
        iD_KhuyenMaiDatPhong: 0,
        tenKhuyenMaiDatPhong: undefined,
        soNgayLuuTruToiThieu: 0,
        soNgayDatTruoc: 0,
        giaCongThem: undefined,
        phanTramGiamGia: undefined,
        phanTramDatCoc: undefined,
        baoGomAnSang: false,
        duocPhepHuy: false,
        duocPhepThayDoi: false,
        ngayBatDau: new Date().toDateString(),
        ngayKetThuc: new Date().toDateString(),
        tatCaNgayTrongTuan: false,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        trangThai: true,
        index: 0,
        nN_KhuyenMaiDatPhongRequests: [],
        loaiPhong_KhuyenMaiDatPhongVMs: [],
      };
    }
    modalRef.componentInstance.data = data;
    modalRef.closed.subscribe(this.loadAllDataKhuyenMai);
  }
  public isSelectData(event) {
    this.isHiddenButtonDeleteAll = !event;
  }
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceKhuyenMai.filter = filterValue;
  }
  public addDataSelect(listSelect) {
    this.listSelect = listSelect;
  }
  public deleteData(row) {
    this.deleteOne(row.iD_KhuyenMaiDatPhong);
  }
  private deleteOne(id: number) {
    var sb = this.khuyenMaiService
      .get_ChiTiet_KhuyenMai(id)
      .subscribe((res: any) => {
        if (res) {
          const modalRef = this.modalService.open(XacNhanXoaComponent, {
            size: "500",
          });
          modalRef.componentInstance.tieuDe = ` ${res.tenKhuyenMaiDatPhong} `;
          modalRef.result.then(
            (data) => {
              // on close
            },
            (reason) => {
              // on dismiss
              if (reason == "1") {
                this.callDeleteRow(id, res.tenKhuyenMaiDatPhong);
              }
            }
          );
        } else {
          this.openSnackBar(`Dịch vụ không tồn tại!`, this.bgcss.Warning);
        }
      });
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
  callDeleteRow(id, tenKhuyenMaiDatPhong, isDeleteMore = false) {
    var sb = this.khuyenMaiService.get_xoa(id).subscribe((x: any) => {
      if (x.kq) {
        this.openSnackBar(
          `Xóa ${tenKhuyenMaiDatPhong} thành công!`,
          this.bgcss.Success
        );
        this.loadAllDataKhuyenMai();
      }
    });
    if (!isDeleteMore) {
      this.loadAllDataKhuyenMai();
      this.isHiddenButtonDeleteAll = true;
    }

    this.subscriptions.push(sb);
  }
 
  public deleteAllData(event) {
    for (let index = 0; index < this.listSelect.length; index++) {
      const element = this.listSelect[index];
      if (index + 1 === this.listSelect.length) {
        this.callDeleteRow(
          element.iD_KhuyenMaiDatPhong,
          element.tenKhuyenMaiDatPhong
        );
      } else {
        this.callDeleteRow(
          element.iD_KhuyenMaiDatPhong,
          element.tenKhuyenMaiDatPhong,
          true
        );
      }
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
