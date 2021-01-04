import { NN_ObjectRequest } from "./nn-object.model";

export interface SoNguoiToiDa{
    iD_SoNguoiToiDa: number;
    tieuDe: string;
    trangThai: boolean;
    createDate: Date;
    createBy: string;
    modifyDate: Date;
    modifyBy: string;
    nN_ObjectRequests: NN_ObjectRequest[];
}