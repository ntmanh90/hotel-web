import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { KhuyenMaiService } from "../_services/khuyen-mai.service";
import { DialogChiTietKhuyenMaiComponent } from "./dialog-chi-tiet-khuyen-mai/dialog-chi-tiet-khuyen-mai.component";

@Component({
  selector: "app-khuyen-mai",
  templateUrl: "./khuyen-mai.component.html",
  styleUrls: ["./khuyen-mai.component.scss"],
})
export class KhuyenMaiComponent implements OnInit {
  public isHiddenButtonDeleteAll: boolean = true;
  public displayedColumns = [
    "select",
    "maKhuyenMaiDatPhong",
    "tenKhuyenMaiDatPhong",
    "baoGomAnSang",
    "duocPhepHuy",
    "duocPhepThayDoi",
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
  constructor(
    private khuyenMaiService: KhuyenMaiService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
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
    },
    {
      field: "ngayKetThuc",
      title: "Ngày kết thúc",
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
  private loadAllDataKhuyenMai() {
    const sb = this.khuyenMaiService.get_DanhSach().subscribe((res) => {
      this.dataSourceKhuyenMai = new MatTableDataSource();
      this.dataSourceKhuyenMai.data = res;
      this.dataSourceKhuyenMai.paginator = this.paginator;
      this.dataSourceKhuyenMai.sort = this.sort;
    });
    this.subscriptions.push(sb);
  }
  public openDialogChiTietKhuyenMai(id: number) {
    const modalRef = this.modalService.open(DialogChiTietKhuyenMaiComponent, {
      size: "lg",
    });
  }
}
