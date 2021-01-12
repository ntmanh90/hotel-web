export interface JSONTaoMoiPhong{
    iD_LoaiPhong: number;
    iD_HuongNhin: number;
    nguoiLon: number;
    treEm: number;
    maLoaiPhong: string;
    tenLoaiPhong: string;
    anhDaiDien: string;
    kichThuoc: string;
    trangThai: boolean;
    nN_LoaiPhongRequests? : LoaiPhongRequests[];
    loaiPhong_LoaiGiuong_Requests?: LoaiGiuong_Requests[];
    loaiPhong_TienIch_Requests? : TienIch_Requests[];
    loaiPhong_Gallery_Requests?:  Gallery_Requests[];

}
interface LoaiPhongRequests{
    iD_NgonNgu: number,
    tenLoaiPhongTheoNgonNgu: string
}
interface LoaiGiuong_Requests{
    iD_LoaiGiuong: number,
}
interface TienIch_Requests{
    iD_TienIch: number,
}
interface Gallery_Requests{
    url_Gallery: string
}
    
