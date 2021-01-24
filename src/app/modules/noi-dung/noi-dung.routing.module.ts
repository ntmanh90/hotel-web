import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DichVuComponent } from "./dich-vu/dich-vu.component";
import { DetailHoaDonComponent } from "./hoa-don/detail-hoa-don/detail-hoa-don.component";
import { HoaDonComponent } from "./hoa-don/hoa-don.component";
import { KhuyenMaiComponent } from "./khuyen-mai/khuyen-mai.component";
import { LoaiPhongComponent } from "./loai-phong/loai-phong.component";
import { PhanQuyenComponent } from "./phan-quyen/phan-quyen.component";
import { PhongGiaComponent } from "./phong-gia/phong-gia.component";

const routes: Routes = [
  {
    path: "loaiphong",
    component: LoaiPhongComponent,
  },
  {
    path: "dichvu",
    component: DichVuComponent,
  },
  {
    path: "phonggia",
    component: PhongGiaComponent,
  },
  {
    path: "khuyenmai",
    component: KhuyenMaiComponent,
  },
  {
    path: "hoadon",
    component: HoaDonComponent,
  },
  {
    path: "hoadon/:id",
    component: DetailHoaDonComponent,
  },
  {
    path: "phanquyen",
    component: PhanQuyenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoidungRoutingModule {}
