import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatPhongComponent } from './dat-phong/dat-phong.component';
import { DichVuComponent } from './dich-vu/dich-vu.component';
import { KhuyenMaiComponent } from './khuyen-mai/khuyen-mai.component';
import { LoaiPhongComponent } from './loai-phong/loai-phong.component';


const routes: Routes = [
  {
    path: 'loaiphong',
    component: LoaiPhongComponent,
  },
  {
    path: 'dichvu',
    component: DichVuComponent,
  },
  {
    path: 'khuyenmai',
    component: KhuyenMaiComponent,
  },
  {
    path: 'datphong',
    component: DatPhongComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoidungRoutingModule {}
