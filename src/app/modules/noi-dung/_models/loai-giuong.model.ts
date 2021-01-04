import { NN_ObjectRequest } from "./nn-object.model";

export interface LoaiGiuong{
    iD_LoaiGiuong: number;
    tieuDe: string;
    trangThai: boolean;
    createDate: Date;
    createBy: string;
    modifyDate: Date;
    modifyBy: string;
    nN_ObjectRequests: NN_ObjectRequest[];
}