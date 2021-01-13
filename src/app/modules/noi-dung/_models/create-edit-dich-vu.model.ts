export interface CreateEditDichVu {
  iD_DichVu: number;
  tenDichvu: string;
  anhDaiDien: string;
  giaTinhTheo: number;
  giaTheoDichVu: number;
  giaTheoDemLuuTru: number;
  giaTheoNguoiLon: number;
  giaTheoTreEm: number;
  trangThai: boolean;
  nN_DichVuRequests: DichVuRequest[];
}
export interface DichVuRequest {
  index?:number;
  tenNgonNgu: string;
  iD_NgonNgu: number;
  tenTheoNgonNgu: string;
  noiDungTheoNgonNgu: string;
}
