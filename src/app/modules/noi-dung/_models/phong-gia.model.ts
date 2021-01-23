export interface ElementComboboxSelectRangeDate {
  id: number;
  viewValue: string;
}
export interface SearchPhongGiaModel {
  TuNgay: string;
  KhoangNgay: number;
  idSearch?: number;
}
export interface PhongGiaViewTable {
  date: Date;
  thu: string;
  data?: any;
}
export interface ListPhongGiaModel {
  caiDatBanPhongVMs: CaiDatBanPhongVMs[];
  iD_LoaiPhong: number;
  khuyenMaiCuaLoaiPhongVMs: KhuyenMaiCuaLoaiPhongVMs[];
  ten_LoaiPhong: string;
  PhongGiaViewTable?: PhongGiaViewTable[];
}
export interface KhuyenMaiCuaLoaiPhongVMs {
  iD_LoaiPhong: number;
  phanTramGiamGia: number;
  tenKhuyenMaiDatPhong: string;
}
export interface CaiDatBanPhongVMs {
  giaBan: number;
  giaKhuyenMaiDatPhongVMs: GiaKhuyenMaiDatPhongVMs[];
  iD_CaiDatBanPhong: number;
  iD_LoaiPhong: number;
  ngayCaiDat: string;
  soLuong: number;
  trangThai: boolean;
}
export interface GiaKhuyenMaiDatPhongVMs {
  price: number;
}
export interface CaiDatGiaBanSoLuongTrangThai{
  iD_LoaiPhong: number;
  giaBan?: number;
  soLuong?: number;
  iD_CaiDatBanPhong?: number;
  trangThai?: boolean;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  ngayCaiDat?: string;
  type:number;
}
export const ENUM_TYPE_UPDATE = {
  TRANGTHAI: 0,
  SOLUONG:1,
  GIABAN: 2
} 
