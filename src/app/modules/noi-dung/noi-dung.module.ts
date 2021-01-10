import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shares/_module/material-module';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { NoiDungComponent } from './noi-dung.component';
import { NoidungRoutingModule } from './noi-dung.routing.module';
import { LoaiPhongComponent } from './loai-phong/loai-phong.component';
import { ChiTietLoaiPhongComponent } from './loai-phong/chi-tiet-loai-phong/chi-tiet-loai-phong.component';
import { DialogThemThongTinLoaiGuongComponent } from './loai-phong/dialog-them-thong-tin-loai-guong/dialog-them-thong-tin-loai-guong.component';
import { DialogThemTienIchComponent } from './loai-phong/dialog-them-tien-ich/dialog-them-tien-ich.component';
import { DialogThemTieuDeNgonNguComponent } from './loai-phong/dialog-them-tieu-de-ngon-ngu/dialog-them-tieu-de-ngon-ngu.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModalModule,
    InlineSVGModule,
    MaterialModule,
    NoidungRoutingModule
  ],
  declarations: [
    NoiDungComponent,
    LoaiPhongComponent,
    ChiTietLoaiPhongComponent,
    DialogThemThongTinLoaiGuongComponent,
    DialogThemTienIchComponent,
    DialogThemTieuDeNgonNguComponent
  ]
})
export class NoiDungModule { }
