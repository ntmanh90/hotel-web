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

import { NgonNguService } from '../_service/ngon-ngu.service';
import { NgonNgu } from '../_module/ngonngu.model';
import { ChiTietNgonNguComponent } from './chi-tiet-ngon-ngu/chi-tiet-ngon-ngu.component';






@Component({
  selector: 'app-ngon-ngu',
  templateUrl: './ngon-ngu.component.html',
  styleUrls: ['./ngon-ngu.component.css']
})
export class NgonNguComponent implements OnInit, OnDestroy {
  tieuDe = "ngôn ngữ";
  ngonNgu: NgonNgu;
  listNgonNgu: any = [];
  displayedColumns: string[] = ['select', 'id_NgonNgu', 'kyHieu', 'tieuDe', 'createDate', 'createBy', 'modifyDate', 'modifyBy', 'edit'];
  selection = new SelectionModel<NgonNgu>(true, []);
  error_xoa_nhieu = '';
  bgcss = new  bgCSS();
  private subscriptions: Subscription[] = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listNgonNgu.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listNgonNgu.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: NgonNgu): string {
    if (this.listNgonNgu.data > 0) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tieuDe}`;
    }
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private ngonNguService: NgonNguService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.listNgonNgu.filter = filterValue;
  }

  // Get Products list
  loadNgonNgu() {
    var sb = this.ngonNguService.get_DanhSach().subscribe((data: {}) => {
      this.listNgonNgu = new MatTableDataSource();
      this.listNgonNgu.data = data;
      this.listNgonNgu.paginator = this.paginator;
      this.listNgonNgu.sort = this.sort;
    },
      error => {
        console.log('Error load ngôn ngữ !!!' + error);
      });
      this.subscriptions.push(sb);
  }

  //Hiển thị dialog
  chiTietNgonNgu(id: number) {
    const modalRef = this.modalService.open(ChiTietNgonNguComponent, { size: 'sm' });
    modalRef.componentInstance.id = id;
    modalRef.result.then((data) => {
      // on close
    }, (reason) => {
      // on dismiss
      if (reason) {
        this.openSnackBar(`${reason} thành công!`, this.bgcss.Success);
        this.loadNgonNgu();
      }
    });
  }
  xoa_mot(id: number) {
    var sb = this.ngonNguService.get_ChiTiet_NgonNgu(id).subscribe(
      (res: NgonNgu) => {
        if (res) {
          const modalRef = this.modalService.open(XacNhanXoaComponent, { size: '500' });
          modalRef.componentInstance.tieuDe = `${this.tieuDe} ${res.tieuDe}`;
          modalRef.result.then((data) => {
            // on close
          }, (reason) => {
            // on dismiss
            if (reason == '1') {
              var sb = this.ngonNguService.get_xoa(id).subscribe(
                (x: any) => {
                  if (x.kq) {
                    this.openSnackBar(`Xóa ${this.tieuDe} ${res.tieuDe} thành công!`, this.bgcss.Success);
                    this.loadNgonNgu();
                  }
                }
              );
              this.loadNgonNgu();
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
          var sb = this.ngonNguService.get_xoa(item.iD_NgonNgu).subscribe(
            (x: any) => {
              if (!x.kq) {
                this.error_xoa_nhieu += item.tieuDe + ",";
              }
            }
          );
          this.subscriptions.push(sb);
        });
        
        if (this.error_xoa_nhieu.length > 1) {
          this.openSnackBar(`Không thể xóa được ${this.tieuDe} ${this.error_xoa_nhieu}`, this.bgcss.Error);
          this.loadNgonNgu();
        }
        else {
          this.openSnackBar(`xóa nhiều ${this.tieuDe} thành công!`, this.bgcss.Success);
          this.loadNgonNgu();
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadNgonNgu();
  }
  ngOnDestroy()
  {
    this.subscriptions.forEach(sb=>sb.unsubscribe());
  }
  openSnackBar(action, bgCss) {
    this._snackBar.open(action, 'x', {
      duration: 2500,
      panelClass: [bgCss],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
