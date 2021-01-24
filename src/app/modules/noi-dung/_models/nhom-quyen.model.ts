export interface NhomQuyen {
  iD_NhomQuyen: number;
  tenNhomQuyen: string;
}
export interface DanhSachNhomQuyen {
  iD_NhomQuyen: number;
  iD_KhachSan: number;
  maNhomQuyen: string;
  tenNhomQuyen: string;
  delete: boolean;
  createDate: string;
  modifyDate: string;
  createBy: string;
  modifyBy: string;
  select?: boolean;
}
