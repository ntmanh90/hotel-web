export interface CreateEditKhuyenMaiModel {
  iD_KhuyenMaiDatPhong: number;
  tenKhuyenMaiDatPhong: string;
  soNgayLuuTruToiThieu: number;
  soNgayDatTruoc: number;
  giaCongThem: number;
  phanTramGiamGia: number;
  phanTramDatCoc: number;
  baoGomAnSang: boolean;
  duocPhepHuy: boolean;
  duocPhepThayDoi: boolean;
  ngayBatDau: string;
  ngayKetThuc: string;
  tatCaNgayTrongTuan: boolean;
  thuHai: boolean;
  thuBa: boolean;
  thuTu: boolean;
  thuNam: boolean;
  thuSau: boolean;
  thuBay: boolean;
  chuNhat: boolean;
  trangThai: boolean;
  index: number;
  nN_KhuyenMaiDatPhongRequests: nN_KhuyenMaiDatPhongRequests[];
  loaiPhong_KhuyenMaiDatPhongVMs: loaiPhong_KhuyenMaiDatPhongVMs[];
  nN_KhuyenMaiDatPhongVMs: nN_KhuyenMaiDatPhongRequests[];
  
}
export interface nN_KhuyenMaiDatPhongRequests {
  index?:number;
  iD_NgonNgu: number;
  tenNgonNgu?: string;
  tenTheoNgonNgu: string;
  dieuKhoan_DieuKien: string;
}
export interface loaiPhong_KhuyenMaiDatPhongVMs {
  iD_LoaiPhong: number;
  tenLoaiPhong: string;
  daChon: boolean;
}
