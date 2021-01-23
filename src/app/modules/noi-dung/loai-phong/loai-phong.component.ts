import { OnDestroy, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatSnackBar } from "@angular/material/snack-bar";
import { bgCSS } from "../../shares/_models/bgCss.model";
import { Subscription } from "rxjs";
import { XacNhanXoaComponent } from "../../shares/xac-nhan-xoa/xac-nhan-xoa.component";
import { LoaiPhong } from "../_models/loai-phong.model";
import { LoaiPhongService } from "../_services/loai-phong.service";
import { ChiTietLoaiPhongComponent } from "./chi-tiet-loai-phong/chi-tiet-loai-phong.component";

@Component({
  selector: "app-loai-phong",
  templateUrl: "./loai-phong.component.html",
  styleUrls: ["./loai-phong.component.scss"],
})
export class LoaiPhongComponent implements OnInit, OnDestroy {
  tieuDe = "loại phòng";
  bgcss = new bgCSS();
  private subscriptions: Subscription[] = [];
  public ListColumnDef = [
    {
      field: "iD_LoaiPhong",
      title: "ID loại phòng",
    },
    {
      field: "maLoaiPhong",
      title: "Mã loại phòng",
    },
    {
      field: "tenLoaiPhong",
      title: "Tên loại phòng",
    },
    {
      field: "anhDaiDien",
      title: "Ảnh loại phòng",
    },
    {
      field: "kichThuoc",
      title: "Kích thước",
    },
    {
      field: "trangThai",
      title: "Trạng thái",
      type: 2
    },
    {
      field: "createDate",
      title: "Ngày tạo",
      type: 6
    },
    {
      field: "createBy",
      title: "Tạo bởi",
    },
    {
      field: "modifyDate",
      title: "Ngày chỉnh sửa",
      type: 6
    },
    {
      field: "modifyBy",
      title: "Chỉnh sửa bởi",
    },
  ];
  displayedColumns: string[] = [
    "select",
    "iD_LoaiPhong",
    "maLoaiPhong",
    "tenLoaiPhong",
    "anhDaiDien",
    "kichThuoc",
    "trangThai",
    "createDate",
    "createBy",
    "modifyDate",
    "modifyBy",
    "edit",
  ];
  public isHiddenButtonDeleteAll: boolean = true;
  private listSelect = [];
  error_xoa_nhieu = "";
  loaiPhong: LoaiPhong;
  dataSourceLoaiPhong: any = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loaiPhongService: LoaiPhongService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.loadAllDataLoaiPhong();
  }
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceLoaiPhong.filter = filterValue;
  }

  loadAllDataLoaiPhong() {
    var sb = this.loaiPhongService.get_DanhSach().subscribe(
      (data: {}) => {
        this.dataSourceLoaiPhong.data = data;
        this.dataSourceLoaiPhong.paginator = this.paginator;
        this.dataSourceLoaiPhong.sort = this.sort;
      },
      (error) => {
        console.log(`Error load ${this.tieuDe} !!!' + ${error}`);
      }
    );
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

  //Hiển thị dialog
  public openDialogChiTietLoaiPhong(event) {
    const modalRef = this.modalService.open(ChiTietLoaiPhongComponent, {
      size: "lg",
    }); //lg, xl, sm
    let data = event;
    if (!isNaN(event)) {
      data = {
        iD_LoaiPhong: 0,
        iD_HuongNhin: 0,
        nguoiLon: 0,
        treEm: 0,
        maLoaiPhong: undefined,
        tenLoaiPhong: undefined,
        anhDaiDien: undefined,
        kichThuoc: undefined,
        index: 0,
        trangThai: true,
        nN_LoaiPhongRequests: [],
        loaiPhong_LoaiGiuong_Requests: [],
        loaiPhong_TienIch_Requests: [],
        loaiPhong_Gallery_Requests: [],
      };
    }
    modalRef.componentInstance.data = data;
    modalRef.result.then(
      (data) => {
        // on close
      },
      (reason) => {
        // on dismiss
        if (reason) {
          this.openSnackBar(`${reason} thành công!`, this.bgcss.Success);
          this.loadAllDataLoaiPhong();
        }
      }
    );
  }
  private deleteOne(id: number) {
    var sb = this.loaiPhongService
      .get_ChiTiet_LoaiPhong(id)
      .subscribe((res: LoaiPhong) => {
        if (res) {
          const modalRef = this.modalService.open(XacNhanXoaComponent, {
            size: "500",
          });
          modalRef.componentInstance.tieuDe = `${this.tieuDe} ${res.tenLoaiPhong}`;
          modalRef.result.then(
            (data) => {
              // on close
            },
            (reason) => {
              // on dismiss
              if (reason == "1") {
                var sb = this.loaiPhongService
                  .get_xoa(id)
                  .subscribe((x: any) => {
                    if (x.kq) {
                      this.openSnackBar(
                        `Xóa ${this.tieuDe} ${res.tenLoaiPhong} thành công!`,
                        this.bgcss.Success
                      );
                      this.loadAllDataLoaiPhong();
                    }
                  });
                this.loadAllDataLoaiPhong();
                this.subscriptions.push(sb);
              }
            }
          );
        } else {
          this.openSnackBar(
            `${this.tieuDe} không tồn tại!`,
            this.bgcss.Warning
          );
        }
      });
    this.subscriptions.push(sb);
  }
  public isSelectData(event) {
    this.isHiddenButtonDeleteAll = !event;
  }
  public addDataSelect(listSelect) {
    this.listSelect = listSelect;
  }
  public deleteData(row) {
    this.deleteOne(row.iD_DichVu);
  }
  private executeDeleteMoreData() {
    const modalRef = this.modalService.open(XacNhanXoaComponent, {
      size: "500",
    });
    modalRef.componentInstance.tieuDe = `${this.tieuDe}`;
    modalRef.result.then(
      (data) => {
        // on close
      },
      (reason) => {
        // on dismiss
        if (reason == "1") {
          this.listSelect.forEach((item) => {
            var sb = this.loaiPhongService
              .get_xoa(item.iD_LoaiPhong)
              .subscribe((x: any) => {
                if (!x.kq) {
                  this.error_xoa_nhieu += item.tenLoaiPhong + ",";
                }
              });
            this.subscriptions.push(sb);
          });

          if (this.error_xoa_nhieu.length > 1) {
            this.openSnackBar(
              `Không thể xóa được ${this.tieuDe} ${this.error_xoa_nhieu}`,
              this.bgcss.Error
            );
            this.loadAllDataLoaiPhong();
          } else {
            this.openSnackBar(
              `xóa nhiều ${this.tieuDe} thành công!`,
              this.bgcss.Success
            );
            this.listSelect = []
            this.loadAllDataLoaiPhong();
          }
        }
      }
    );
  }

  
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  public deleteAllData(event) {}
}
