import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shares/_module/material-module';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { DanhMucComponent } from './danh-muc.component';
import { NgonNguComponent } from './ngon-ngu/ngon-ngu.component';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { ChiTietNgonNguComponent } from './ngon-ngu/chi-tiet-ngon-ngu/chi-tiet-ngon-ngu.component';
import { LoaiGiuongComponent } from './loai-giuong/loai-giuong.component';
import { ChiTietLoaiGiuongComponent } from './loai-giuong/chi-tiet-loai-giuong/chi-tiet-loai-giuong.component';
import { HuongNhinComponent } from './huong-nhin/huong-nhin.component';
import { ChiTietHuongNhinComponent } from './huong-nhin/chi-tiet-huong-nhin/chi-tiet-huong-nhin.component';
import { ChiTietTienIchComponent } from './tien-ich/chi-tiet-tien-ich/chi-tiet-tien-ich.component';
import { TienIchComponent } from './tien-ich/tien-ich.component';
import { SoNguoiToiDaComponent } from './so-nguoi-toi-da/so-nguoi-toi-da.component';
import { ChiTietSoNguoiToiDaComponent } from './so-nguoi-toi-da/chi-tiet-so-nguoi-toi-da/chi-tiet-so-nguoi-toi-da.component';


@NgModule({
  declarations: [
    DanhMucComponent,
    NgonNguComponent, 
    ChiTietNgonNguComponent,
    LoaiGiuongComponent,
    ChiTietLoaiGiuongComponent,
    HuongNhinComponent,
    ChiTietHuongNhinComponent,
    TienIchComponent,
    ChiTietTienIchComponent,
    SoNguoiToiDaComponent,
    ChiTietSoNguoiToiDaComponent
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
