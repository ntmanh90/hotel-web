import { NN_ObjectRequest } from "./nn-object.model";

export interface TienIch{
    iD_TienIch: number;
    tieuDe: string;
    trangThai: boolean;
    createDate: Date;
    createBy: string;
    modifyDate: Date;
    modifyBy: string;
    nN_ObjectRequests: NN_ObjectRequest[];
}