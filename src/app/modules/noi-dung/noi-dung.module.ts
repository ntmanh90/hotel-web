import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shares/_module/material-module";
import { InlineSVGModule } from "ng-inline-svg";
import {
  NgbActiveModal,
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
import { PhongGiaComponent } from './phong-gia/phong-gia.component';
import { DialogCaiDatGiaPhongComponent } from './phong-gia/dialog-cai-dat-gia-phong/dialog-cai-dat-gia-phong.component';
import { DialogDongMoPhongComponent } from './phong-gia/dialog-dong-mo-phong/dialog-dong-mo-phong.component';
import { ListDateBookRoomComponent } from './phong-gia/list-date-book-room/list-date-book-room.component';
import { DateBookRoomComponent } from './phong-gia/date-book-room/date-book-room.component';
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
import { PipeModule } from "../shares/pipe/pipe.module";
import { PhanQuyenComponent } from "./phan-quyen/phan-quyen.component";
import { ElementNhomQuyenComponent } from "./phan-quyen/element-nhom-quyen/element-nhom-quyen.component";
import { ElementNhomTaiKhoanComponent } from "./phan-quyen/element-nhom-tai-khoan/element-nhom-tai-khoan.component";
import { DialogChiTietNhomQuyenComponent } from "./phan-quyen/dialog-chi-tiet-nhom-quyen/dialog-chi-tiet-nhom-quyen.component";
import { ElementThemTaiKhoanVaoNhomPhanQuyenComponent } from "./phan-quyen/element-them-tai-khoan-vao-nhom/element-them-tai-khoan-vao-nhom.component";
import { ElementPhanQuyenChucNangComponent } from "./phan-quyen/element-phan-quyen-chuc-nang/element-phan-quyen-chuc-nang.component";

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
    PipeModule
  ],
  declarations: [
    NoiDungComponent,
    LoaiPhongComponent,
    ChiTietLoaiPhongComponent,
    DichVuComponent,
    ChiTietDichVuComponent,
    PhongGiaComponent,
    DialogCaiDatGiaPhongComponent,
    DialogDongMoPhongComponent,
    ListDateBookRoomComponent,
    DateBookRoomComponent,
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
    PhanQuyenComponent,
    ElementNhomQuyenComponent,
    ElementNhomTaiKhoanComponent,
    DialogChiTietNhomQuyenComponent,
    ElementThemTaiKhoanVaoNhomPhanQuyenComponent,
    ElementPhanQuyenChucNangComponent
  ],
})
export class NoiDungModule {}
