import { LoaiPhong_Object_Request } from "./LoaiPhong- Object-Request.model";
import { LoaiPhong_Gallery_Request } from "./loaiPhong-Gallery-Request.model";
import { NN_ObjectRequest } from "./nn-object.model";

export interface LoaiPhong {
    iD_LoaiPhong: number;

    maLoaiPhong: string;  //Mã loại phòng = Ký hiệu khách sạn + 3 chữ số phía sau

    tenLoaiPhong: string;

    anhDaiDien: string;

    kichThuoc: number;

    id_HuongNhin: number;
    id_SoNguoiToiDa: number,

    trangThai: boolean;
    createDate:Date;
    createBy: string;
    modifyDate: Date;
    modifyBy: string;

    //Ngôn ngữ cho tiêu đề loại phòng
    nN_ObjectRequests: NN_ObjectRequest[]

    loaiPhong_LoaiGiuong_Request: LoaiPhong_Object_Request[];
    loaiPhong_TienIch_Request: LoaiPhong_Object_Request[];
    loaiPhong_Gallery_Requests: LoaiPhong_Gallery_Request[];
}