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
import { SoNguoiToiDa } from '../_module/so-nguoi-toi-da.model';
import { SoNguoiToiDaService } from '../_service/so-nguoi-toi-da.service';
import { ChiTietSoNguoiToiDaComponent } from './chi-tiet-so-nguoi-toi-da/chi-tiet-so-nguoi-toi-da.component';

@Component({
  selector: 'app-so-nguoi-toi-da',
  templateUrl: './so-nguoi-toi-da.component.html',
  styleUrls: ['./so-nguoi-toi-da.component.scss']
})


export class SoNguoiToiDaComponent implements OnInit, OnDestroy {
  
  tieuDe = "số người tối đa";
  bgcss = new  bgCSS();
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['select', 'iD_SoNguoiToiDa', 'tieuDe','trangThai', 'createDate', 'createBy', 'modifyDate', 'modifyBy', 'edit'];

  selection = new SelectionModel<SoNguoiToiDa>(true, []);
error_xoa_nhieu = '';
soNguoiToiDa: SoNguoiToiDa;
listSoNguoiToiDa: any = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listSoNguoiToiDa.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listSoNguoiToiDa.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SoNguoiToiDa): string {
    if (this.listSoNguoiToiDa.data > 0) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tieuDe}`;
    }
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private soNguoiToiDaService: SoNguoiToiDaService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,

  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.listSoNguoiToiDa.filter = filterValue;
  }

    // Get Products list
    loadSoNguoiToiDa() {
      var sb = this.soNguoiToiDaService.get_DanhSach().subscribe((data: {}) => {
        this.listSoNguoiToiDa = new MatTableDataSource();
        this.listSoNguoiToiDa.data = data;
        this.listSoNguoiToiDa.paginator = this.paginator;
        this.listSoNguoiToiDa.sort = this.sort;
      },
        error => {
          console.log(`Error load ${this.tieuDe} !!!' + error`);
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
  chiTietSoNguoiToiDa(id: number) {
    const modalRef = this.modalService.open(ChiTietSoNguoiToiDaComponent, { size: 'lg' }); //lg, xl, sm
    modalRef.componentInstance.id = id;
    modalRef.result.then((data) => {
      // on close
    }, (reason) => {
      // on dismiss
      if (reason) {
        this.openSnackBar(`${reason} thành công!`, this.bgcss.Success);
        this.loadSoNguoiToiDa();
      }
    });
  }
    xoa_mot(id: number) {
      var sb = this.soNguoiToiDaService.get_ChiTiet_SoNguoiToiDa(id).subscribe(
        (res: SoNguoiToiDa) => {
          if (res) {
            const modalRef = this.modalService.open(XacNhanXoaComponent, { size: '500' });
            modalRef.componentInstance.tieuDe = `${this.tieuDe} ${res.tieuDe}`;
            modalRef.result.then((data) => {
              // on close
            }, (reason) => {
              // on dismiss
              if (reason == '1') {
                var sb = this.soNguoiToiDaService.get_xoa(id).subscribe(
                  (x: any) => {
                    if (x.kq) {
                      this.openSnackBar(`Xóa ${this.tieuDe} ${res.tieuDe} thành công!`, this.bgcss.Success);
                      this.loadSoNguoiToiDa();
                    }
                  }
                );
                this.loadSoNguoiToiDa();
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
            var sb = this.soNguoiToiDaService.get_xoa(item.iD_SoNguoiToiDa).subscribe(
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
            this.loadSoNguoiToiDa();
          }
          else {
            this.openSnackBar(`xóa nhiều ${this.tieuDe} thành công!`, this.bgcss.Success);
            this.selection = new SelectionModel<SoNguoiToiDa>(true, []);
            this.loadSoNguoiToiDa();
          }
        }
      });
    }

  ngOnInit() {
    this.loadSoNguoiToiDa();
  }
  ngOnDestroy()
  {
    this.subscriptions.forEach(sb=>sb.unsubscribe());
  }
  

}
