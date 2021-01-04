import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoaiPhongComponent } from './loai-phong/loai-phong.component';


const routes: Routes = [
  {
    path: 'loaiphong',
    component: LoaiPhongComponent,
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoidungRoutingModule {}
