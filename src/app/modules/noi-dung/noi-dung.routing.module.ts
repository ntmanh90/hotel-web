import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DichVuComponent } from './dich-vu/dich-vu.component';
import { LoaiPhongComponent } from './loai-phong/loai-phong.component';
import { PhongGiaComponent } from './phong-gia/phong-gia.component';


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
    path: 'phonggia',
    component: PhongGiaComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoidungRoutingModule {}
