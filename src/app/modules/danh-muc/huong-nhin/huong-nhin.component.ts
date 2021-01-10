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

import { HuongNhin } from '../_module/huong-nhin.model';
import { HuongNhinService } from '../_service/huong-nhin.service';
import { ChiTietHuongNhinComponent } from './chi-tiet-huong-nhin/chi-tiet-huong-nhin.component';


@Component({
  selector: 'app-huong-nhin',
  templateUrl: './huong-nhin.component.html',
  styleUrls: ['./huong-nhin.component.scss']
})

export class HuongNhinComponent implements OnInit, OnDestroy {
  
  tieuDe = "hướng nhìn";
  bgcss = new  bgCSS();
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['select', 'iD_HuongNhin', 'tieuDe','trangThai', 'createDate', 'createBy', 'modifyDate', 'modifyBy', 'edit'];

  selection = new SelectionModel<HuongNhin>(true, []);
error_xoa_nhieu = '';
huongNhin: HuongNhin;
listHuongNhin: any = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listHuongNhin.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listHuongNhin.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: HuongNhin): string {
    if (this.listHuongNhin.data > 0) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tieuDe}`;
    }
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private huongNhinService: HuongNhinService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,

  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.listHuongNhin.filter = filterValue;
  }

    // Get Products list
    loadHuongNhin() {
      var sb = this.huongNhinService.get_DanhSach().subscribe((data: {}) => {
        this.listHuongNhin = new MatTableDataSource();
        this.listHuongNhin.data = data;
        this.listHuongNhin.paginator = this.paginator;
        this.listHuongNhin.sort = this.sort;
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
  chiTietHuongNhin(id: number) {
    const modalRef = this.modalService.open(ChiTietHuongNhinComponent, { size: 'lg' }); //lg, xl, sm
    modalRef.componentInstance.id = id;
    modalRef.result.then((data) => {
      // on close
    }, (reason) => {
      // on dismiss
      if (reason) {
        this.openSnackBar(`${reason} thành công!`, this.bgcss.Success);
        this.loadHuongNhin();
      }
    });
  }
    xoa_mot(id: number) {
      var sb = this.huongNhinService.get_ChiTiet_HuongNhin(id).subscribe(
        (res: HuongNhin) => {
          if (res) {
            const modalRef = this.modalService.open(XacNhanXoaComponent, { size: '500' });
            modalRef.componentInstance.tieuDe = `${this.tieuDe} ${res.tieuDe}`;
            modalRef.result.then((data) => {
              // on close
            }, (reason) => {
              // on dismiss
              if (reason == '1') {
                var sb = this.huongNhinService.get_xoa(id).subscribe(
                  (x: any) => {
                    if (x.kq) {
                      this.openSnackBar(`Xóa ${this.tieuDe} ${res.tieuDe} thành công!`, this.bgcss.Success);
                      this.loadHuongNhin();
                    }
                  }
                );
                this.loadHuongNhin();
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
            var sb = this.huongNhinService.get_xoa(item.iD_HuongNhin).subscribe(
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
            this.loadHuongNhin();
          }
          else {
            this.openSnackBar(`xóa nhiều ${this.tieuDe} thành công!`, this.bgcss.Success);
            this.selection =  new SelectionModel<HuongNhin>(true, []);
            this.loadHuongNhin();
          }
        }
      });
    }

  ngOnInit() {
    this.loadHuongNhin();
  }
  ngOnDestroy()
  {
    this.subscriptions.forEach(sb=>sb.unsubscribe());
  }
  

}
