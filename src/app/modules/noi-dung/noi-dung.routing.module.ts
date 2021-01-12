import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DichVuComponent } from './dich-vu/dich-vu.component';
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
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoidungRoutingModule {}
