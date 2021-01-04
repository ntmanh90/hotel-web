import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhMucComponent } from './danh-muc.component';
import { HuongNhinComponent } from './huong-nhin/huong-nhin.component';
import { LoaiGiuongComponent } from './loai-giuong/loai-giuong.component';
import { NgonNguComponent } from './ngon-ngu/ngon-ngu.component';
import { SoNguoiToiDaComponent } from './so-nguoi-toi-da/so-nguoi-toi-da.component';
import { TienIchComponent } from './tien-ich/tien-ich.component';

const routes: Routes = [
  {
    path: 'ngonngu',
    component: NgonNguComponent,
  },
  {
    path: 'loaigiuong',
    component: LoaiGiuongComponent,
  },
  {
    path: 'huongnhin',
    component: HuongNhinComponent,
  },
  {
    path: 'songuoitoida',
    component: SoNguoiToiDaComponent,
  },
  {
    path: 'tienich',
    component: TienIchComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DanhMucRoutingModule {}
