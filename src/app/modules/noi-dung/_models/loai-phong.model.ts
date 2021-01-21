export interface LoaiPhong {
  iD_LoaiPhong: number;
  iD_HuongNhin: number;
  nguoiLon: number;
  treEm: number;
  maLoaiPhong: string;
  tenLoaiPhong: string;
  anhDaiDien: string;
  kichThuoc: string;
  index: number;
  trangThai: boolean;
  nN_LoaiPhongRequests: nN_LoaiPhongRequests[];
  loaiPhong_LoaiGiuong_Requests: LoaiPhong_LoaiGiuong_Requests[];
  loaiPhong_TienIch_Requests: LoaiPhong_TienIch_Requests[];
  loaiPhong_Gallery_Requests: LoaiPhong_Gallery_Requests[];
}
export interface LoaiPhong_LoaiGiuong_Requests {
  iD_NgonNgu: number;
  tenLoaiPhongTheoNgonNgu: string;
  index?: number;
  tenNgonNgu?: string;
}
export interface nN_LoaiPhongRequests {
  iD_LoaiGiuong: number;
  tieuDe?: string;
  index?: number;
  soLuong?:number
}
export interface LoaiPhong_TienIch_Requests {
  iD_TienIch: number;
  tieuDe?: string;
  check?: boolean;
}
export interface LoaiPhong_Gallery_Requests {
  url_Gallery: string;
}
