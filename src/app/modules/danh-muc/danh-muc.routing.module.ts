import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhMucComponent } from './danh-muc.component';
import { LoaiGiuongComponent } from './loai-giuong/loai-giuong.component';
import { NgonNguComponent } from './ngon-ngu/ngon-ngu.component';

const routes: Routes = [
  {
    path: 'ngonngu',
    component: NgonNguComponent,
  },
  {
    path: 'loaigiuong',
    component: LoaiGiuongComponent,
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DanhMucRoutingModule {}
