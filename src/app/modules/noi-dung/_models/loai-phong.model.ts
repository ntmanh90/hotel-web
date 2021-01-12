import { LoaiPhong_Object_Request } from "./LoaiPhong-Object-Request.model";
import { LoaiPhong_Gallery_Request } from "./loaiPhong-Gallery-Request.model";
import { NN_ObjectRequest } from "./nn-object.model";

export interface LoaiPhong {
  iD_LoaiPhong: number;

  maLoaiPhong: string; //Mã loại phòng = Ký hiệu khách sạn + 3 chữ số phía sau

  tenLoaiPhong: string;

  anhDaiDien: string;

  kichThuoc: number;

  iD_HuongNhin: number;
  id_SoNguoiToiDaNguoiLon: number;
  id_SoNguoiToiDaTreEm: number;
  trangThai: boolean;
  createDate: Date;
  createBy: string;
  modifyDate: Date;
  modifyBy: string;
  nguoiLon?: number;
  treEm?: number;
  //Ngôn ngữ cho tiêu đề loại phòng
  nN_ObjectRequests: NN_ObjectRequest[];
  nN_LoaiPhongVMs?: any[];
  loaiPhong_TienIchVMs?: any [];
  loaiPhong_LoaiGiuongVMs?: any[];
  loaiPhong_LoaiGiuong_Request: LoaiPhong_Object_Request[];
  loaiPhong_TienIch_Request: LoaiPhong_Object_Request[];
  loaiPhong_Gallery_Requests: LoaiPhong_Gallery_Request[];
}
