import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shares/_module/material-module";
import { InlineSVGModule } from "ng-inline-svg";
import {
  NgbDatepickerModule,
  NgbModalModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NoiDungComponent } from "./noi-dung.component";
import { NoidungRoutingModule } from "./noi-dung.routing.module";
import { LoaiPhongComponent } from "./loai-phong/loai-phong.component";
import { ChiTietLoaiPhongComponent } from "./loai-phong/chi-tiet-loai-phong/chi-tiet-loai-phong.component";
import { DichVuComponent } from "./dich-vu/dich-vu.component";
import { TableModule } from "../shares/table/table.module";
import { ChiTietDichVuComponent } from "./dich-vu/dialog-chi-tiet-dich-vu/dialog-chi-tiet-dich-vu.component";
import { TemplateModule } from "../shares/template/template.module";
import { ValidationModule } from "../shares/validation/validation.module";
import { KhuyenMaiComponent } from "./khuyen-mai/khuyen-mai.component";
import { DialogChiTietKhuyenMaiComponent } from "./khuyen-mai/dialog-chi-tiet-khuyen-mai/dialog-chi-tiet-khuyen-mai.component";
import { ElementLoaiGuongTableComponent } from "./loai-phong/element-loai-guong-table/element-loai-guong-table.component";
import { ElementTienIchCheckListComponent } from "./loai-phong/element-tien-ich-check-list/element-tien-ich-check-list.component";
import { ElementHinhAnhListComponent } from "./loai-phong/element-hinh-anh-list/element-hinh-anh-list.component";
import { DialogThemThongTinLoaiGuongComponent } from "./loai-phong/dialog-them-thong-tin-loai-guong/dialog-them-thong-tin-loai-guong.component";
import { DialogThemTienIchComponent } from "./loai-phong/dialog-them-tien-ich/dialog-them-tien-ich.component";
import { HoaDonComponent } from "./hoa-don/hoa-don.component";
import { DialogCreateUpdateHoaDonComponent } from "./hoa-don/dialog-create-update-hoa-don/dialog-create-update-hoa-don.component";
import { DetailHoaDonComponent } from "./hoa-don/detail-hoa-don/detail-hoa-don.component";
import { CKEditorModule } from "ckeditor4-angular";
import { UploadFileModule } from "../shares/upload-file/upload-file.module";

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
    NoidungRoutingModule,
    TableModule,
    TemplateModule,
    ValidationModule,
    CKEditorModule,
    UploadFileModule,
  ],
  declarations: [
    NoiDungComponent,
    LoaiPhongComponent,
    ChiTietLoaiPhongComponent,
    DichVuComponent,
    ChiTietDichVuComponent,
    KhuyenMaiComponent,
    DialogChiTietKhuyenMaiComponent,
    ElementHinhAnhListComponent,
    ElementLoaiGuongTableComponent,
    ElementTienIchCheckListComponent,
    DialogThemThongTinLoaiGuongComponent,
    DialogThemTienIchComponent,
    HoaDonComponent,
    DialogCreateUpdateHoaDonComponent,
    DetailHoaDonComponent,
  ],
})
export class NoiDungModule {}
