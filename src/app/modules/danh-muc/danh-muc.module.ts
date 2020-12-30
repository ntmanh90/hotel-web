import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DanhMucComponent } from './danh-muc.component';
import { NgonNguComponent } from './ngon-ngu/ngon-ngu.component';
import { MaterialModule } from '../shares/_module/material-module';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucRoutingModule } from './danh-muc.routing.module';
import { ChiTietNgonNguComponent } from './ngon-ngu/chi-tiet-ngon-ngu/chi-tiet-ngon-ngu.component';
import { LoaiGiuongComponent } from './loai-giuong/loai-giuong.component';
import { ChiTietLoaiGiuongComponent } from './loai-giuong/chi-tiet-loai-giuong/chi-tiet-loai-giuong.component';


@NgModule({
  declarations: [
    DanhMucComponent,
    NgonNguComponent, 
    ChiTietNgonNguComponent,
    LoaiGiuongComponent,
    ChiTietLoaiGiuongComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModalModule,
    DanhMucRoutingModule,
    InlineSVGModule,
    MaterialModule,
  ]
})
export class DanhMucModule { }
