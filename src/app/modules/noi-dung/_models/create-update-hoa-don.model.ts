export interface CreateUpdateHoaDonModel {
  iD_HoaDon: number;
  kyHieuNgonNgu: string;
  iD_HinhThucThanhToan: number;
  gioiTinh: string;
  hoTen: string;
  email: string;
  soTienThanhToan: number;
  thoiGianDen: string;
  moTa: string;
  link: string;
  daPhanHoi: boolean;
  daThanhToan: boolean;

  //model other
  maHoaDon?: string;
  HoTenChuThe?: string;
  SoThe?: string;
  MaBaoMatCuaThe?: string;
  NgayHetHan?: string;
}
