import { OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import {bgCSS} from '../../shares/_models/bgCss.model';
import { Subscription } from 'rxjs';
import { XacNhanXoaComponent } from '../../shares/xac-nhan-xoa/xac-nhan-xoa.component';
import { LoaiPhong } from '../_models/loai-phong.model';
import { LoaiPhongService } from '../_services/loai-phong.service';
import { ChiTietLoaiPhongComponent } from './chi-tiet-loai-phong/chi-tiet-loai-phong.component';

@Component({
  selector: 'app-loai-phong',
  templateUrl: './loai-phong.component.html',
  styleUrls: ['./loai-phong.component.scss']
})

export class LoaiPhongComponent implements OnInit, OnDestroy {
  
  tieuDe = "loại phòng";
  bgcss = new  bgCSS();
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['select', 'iD_LoaiPhong', 'maLoaiPhong','tenLoaiPhong','anhDaiDien','kichThuoc','trangThai', 'createDate', 'createBy', 'modifyDate', 'modifyBy', 'edit'];

  selection = new SelectionModel<LoaiPhong>(true, []);
error_xoa_nhieu = '';
loaiPhong: LoaiPhong;
listLoaiPhong: any = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listLoaiPhong.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listLoaiPhong.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: LoaiPhong): string {
    if (this.listLoaiPhong.data > 0) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tenLoaiPhong}`;
    }
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loaiPhongService: LoaiPhongService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,

  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.listLoaiPhong.filter = filterValue;
  }

    // Get Products list
    loadLoaiPhong() {
      var sb = this.loaiPhongService.get_DanhSach().subscribe((data: {}) => {
        this.listLoaiPhong = new MatTableDataSource();
        this.listLoaiPhong.data = data;
        this.listLoaiPhong.paginator = this.paginator;
        this.listLoaiPhong.sort = this.sort;
      },
        error => {
          console.log(`Error load ${this.tieuDe} !!!' + ${error}`);
        });
        this.subscriptions.push(sb);
    }

    openSnackBar(action, bgCss) {
      this._snackBar.open(action, 'x', {
        duration: 2500,
        panelClass: [bgCss],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }

    //Hiển thị dialog
  chiTietLoaiPhong(id: number) {
    const modalRef = this.modalService.open(ChiTietLoaiPhongComponent, { size: 'lg' }); //lg, xl, sm
    modalRef.componentInstance.id = id;
    modalRef.result.then((data) => {
      // on close
    }, (reason) => {
      // on dismiss
      if (reason) {
        this.openSnackBar(`${reason} thành công!`, this.bgcss.Success);
        this.loadLoaiPhong();
      }
    });
  }
    xoa_mot(id: number) {
      var sb = this.loaiPhongService.get_ChiTiet_LoaiPhong(id).subscribe(
        (res: LoaiPhong) => {
          if (res) {
            const modalRef = this.modalService.open(XacNhanXoaComponent, { size: '500' });
            modalRef.componentInstance.tieuDe = `${this.tieuDe} ${res.tenLoaiPhong}`;
            modalRef.result.then((data) => {
              // on close
            }, (reason) => {
              // on dismiss
              if (reason == '1') {
                var sb = this.loaiPhongService.get_xoa(id).subscribe(
                  (x: any) => {
                    if (x.kq) {
                      this.openSnackBar(`Xóa ${this.tieuDe} ${res.tenLoaiPhong} thành công!`, this.bgcss.Success);
                      this.loadLoaiPhong();
                    }
                  }
                );
                this.loadLoaiPhong();
                this.subscriptions.push(sb);
              }
            });
          }
          else {
            this.openSnackBar(`${this.tieuDe} không tồn tại!`, this.bgcss.Warning);
          }
        }
      );
      this.subscriptions.push(sb);
    }
  
    xoa_nhieu() {
      const modalRef = this.modalService.open(XacNhanXoaComponent, { size: '500' });
      modalRef.componentInstance.tieuDe = `${this.tieuDe}`;
      modalRef.result.then((data) => {
        // on close
      }, (reason) => {
        // on dismiss
        if (reason == '1') {
          this.selection.selected.forEach(item => {
            var sb = this.loaiPhongService.get_xoa(item.iD_LoaiPhong).subscribe(
              (x: any) => {
                if (!x.kq) {
                  this.error_xoa_nhieu += item.tenLoaiPhong + ",";
                }
              }
            );
            this.subscriptions.push(sb);
          });
          
          if (this.error_xoa_nhieu.length > 1) {
            this.openSnackBar(`Không thể xóa được ${this.tieuDe} ${this.error_xoa_nhieu}`, this.bgcss.Error);
            this.loadLoaiPhong();
          }
          else {
            this.openSnackBar(`xóa nhiều ${this.tieuDe} thành công!`, this.bgcss.Success);
            this.selection =  new SelectionModel<LoaiPhong>(true, []);
            this.loadLoaiPhong();
          }
        }
      });
    }

  ngOnInit() {
    debugger
    this.loadLoaiPhong();
  }
  ngOnDestroy()
  {
    this.subscriptions.forEach(sb=>sb.unsubscribe());
  }
  

}

