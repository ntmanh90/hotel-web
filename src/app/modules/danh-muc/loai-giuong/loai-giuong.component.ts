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

import { LoaiGiuong } from "../_module/loai-giuong.model";
import { LoaiGiuongService } from "../_service/loai-giuong.service";
import { ChiTietLoaiGiuongComponent } from "./chi-tiet-loai-giuong/chi-tiet-loai-giuong.component";

@Component({
  selector: "app-loai-giuong",
  templateUrl: "./loai-giuong.component.html",
  styleUrls: ["./loai-giuong.component.scss"],
})
export class LoaiGiuongComponent implements OnInit, OnDestroy {
  tieuDe = "loại giường";
  bgcss = new bgCSS();
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = [
    "select",
    "iD_LoaiGiuong",
    "tieuDe",
    "trangThai",
    "createDate",
    "createBy",
    "modifyDate",
    "modifyBy",
    "edit",
  ];

  selection = new SelectionModel<LoaiGiuong>(true, []);
  error_xoa_nhieu = "";
  loaiGiuong: LoaiGiuong;
  listLoaiGiuong: any = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listLoaiGiuong.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.listLoaiGiuong.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: LoaiGiuong): string {
    if (this.listLoaiGiuong.data > 0) {
      if (!row) {
        return `${this.isAllSelected() ? "select" : "deselect"} all`;
      }
      return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
        row.tieuDe
      }`;
    }
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loaiGiuongService: LoaiGiuongService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.listLoaiGiuong.filter = filterValue;
  }

  // Get Products list
  loadLoaiGiuong() {
    var sb = this.loaiGiuongService.get_DanhSach().subscribe(
      (data: {}) => {
        this.listLoaiGiuong = new MatTableDataSource();
        this.listLoaiGiuong.data = data;
        this.listLoaiGiuong.paginator = this.paginator;
        this.listLoaiGiuong.sort = this.sort;
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
  chiTietLoaiGiuong(id: number) {
    const modalRef = this.modalService.open(ChiTietLoaiGiuongComponent, {
      size: "lg",
    }); //lg, xl, sm
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      (data) => {
        // on close
      },
      (reason) => {
        // on dismiss
        if (reason) {
          this.openSnackBar(`${reason} thành công!`, this.bgcss.Success);
          this.loadLoaiGiuong();
        }
      }
    );
  }
  xoa_mot(id: number) {
    var sb = this.loaiGiuongService
      .get_ChiTiet_LoaiGiuong(id)
      .subscribe((res: LoaiGiuong) => {
        if (res) {
          const modalRef = this.modalService.open(XacNhanXoaComponent, {
            size: "500",
          });
          modalRef.componentInstance.tieuDe = `${this.tieuDe} ${res.tieuDe}`;
          modalRef.result.then(
            (data) => {
              // on close
            },
            (reason) => {
              // on dismiss
              if (reason == "1") {
                var sb = this.loaiGiuongService
                  .get_xoa(id)
                  .subscribe((x: any) => {
                    if (x.kq) {
                      this.openSnackBar(
                        `Xóa ${this.tieuDe} ${res.tieuDe} thành công!`,
                        this.bgcss.Success
                      );
                      this.loadLoaiGiuong();
                    }
                  });
                this.loadLoaiGiuong();
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

  xoa_nhieu() {
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
          this.selection.selected.forEach((item) => {
            var sb = this.loaiGiuongService
              .get_xoa(item.iD_LoaiGiuong)
              .subscribe((x: any) => {
                if (!x.kq) {
                  this.error_xoa_nhieu += item.tieuDe + ",";
                }
              });
            this.subscriptions.push(sb);
          });

          if (this.error_xoa_nhieu.length > 1) {
            this.openSnackBar(
              `Không thể xóa được ${this.tieuDe} ${this.error_xoa_nhieu}`,
              this.bgcss.Error
            );
            this.loadLoaiGiuong();
          } else {
            this.openSnackBar(
              `xóa nhiều ${this.tieuDe} thành công!`,
              this.bgcss.Success
            );
            this.selection = new SelectionModel<LoaiGiuong>(true, []);
            this.loadLoaiGiuong();
          }
        }
      }
    );
  }

  ngOnInit() {
    this.loadLoaiGiuong();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
