import { LogMessageService } from "../../shares/_services/logMessage.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

import { BaseService } from "../../shares/_services/base.service";
import { catchError, map, tap } from "rxjs/operators";
import { CreateEditDichVu } from "../_models/create-edit-dich-vu.model";

@Injectable({
  providedIn: "root",
})
export class DichVuService extends BaseService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  _tieuDe = "dịch vụ";
  cur_service = "DichVuService";
  API_URL = `${environment.apiUrl}/dichvu`;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(
    private http: HttpClient,
    private logMessageService: LogMessageService
  ) {
    super();
  }
  get_DanhSach(): Observable<any[]> {
    this.log(`${this.cur_service}: danh sách ${this._tieuDe}`);
    return this.http
      .get<any[]>(`${this.API_URL}/danh-sach`, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  post_Them_DichVu(dichVu: CreateEditDichVu): Observable<CreateEditDichVu> {
    return this.http
      .post<CreateEditDichVu>(`${this.API_URL}/them`, dichVu, this.httpOptions)
      .pipe(catchError(this.handleErrorS));
  }
  get_ChiTiet_DichVu(id: number): Observable<any> {
    return this.http
      .get(`${this.API_URL}/chi-tiet?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: any) => {
          this.log(`Lấy ${this._tieuDe} ${id}, kq ${x}`);
        })
      );
  }
  //show log lỗi service
  private log(message: string) {
    //this.logMessageService.add(`LoaiPhongService: ${message}`);
    this.logMessageService.add(`LoaiPhongService: ${message}`);
  }
}
