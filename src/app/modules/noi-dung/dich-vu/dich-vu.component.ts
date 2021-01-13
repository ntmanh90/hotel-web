import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DichVuService } from '../_services/dich-vu.service';
import { ChiTietDichVuComponent } from './dialog-chi-tiet-dich-vu/dialog-chi-tiet-dich-vu.component';
@Component({
  selector: 'app-dich-vu',
  templateUrl: './dich-vu.component.html',
  styleUrls: ['./dich-vu.component.scss'],
})
export class DichVuComponent implements OnInit, OnDestroy {
  public dataSourceDichVu: any = new MatTableDataSource();
  public ListColumnDef = [
    {
      id: 0,
      field: 'index',
      title: 'Số thứ tự',
    },
    {
      id: 1,
      field: 'name',
      title: 'Tên Dịch Vụ',
    },
    {
      id: 2,
      field: 'price',
      title: 'Giá Tính Theo',
    },
    {
      id: 3,
      field: 'priceDichVu',
      title: 'Giá Dịch Vụ',
    },
    {
      id: 4,
      field: 'gender',
      title: 'Giới Tính',
    },
    {
      id: 5,
      field: 'status',
      title: 'Trạng Thái',
    },
    {
      id: 6,
      field: 'type',
      title: 'Phân Loại',
    },
  ];
  public displayedColumns = [
    'select',
    'index',
    'name',
    'price',
    'priceDichVu',
    'gender',
    'status',
    'type',
    'edit',
  ];
  private subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private dichVuService: DichVuService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.loadAllDataDichVu();
  }
  // Get Products list
  private loadAllDataDichVu() {
    const sb = this.dichVuService.get_DanhSach().subscribe((data: {}) => {
      this.dataSourceDichVu = new MatTableDataSource();
      this.dataSourceDichVu.data = data;
      this.dataSourceDichVu.paginator = this.paginator;
      this.dataSourceDichVu.sort = this.sort;
      console.log(data);
    });
    this.subscriptions.push(sb);
  }
  public openDialogChiTietDichVu(event) {
    const modalRef = this.modalService.open(ChiTietDichVuComponent, {
      size: 'lg',
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
