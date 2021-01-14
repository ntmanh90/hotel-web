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
export class BaseDataService extends BaseService {
  protected _isLoading$ = new BehaviorSubject<boolean>(false);
  protected _tieuDe = "dịch vụ";
  protected cur_service = "DichVuService";
  protected slat = "dichvu"
  protected API_URL = `${environment.apiUrl}/${this.slat}`;

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
  get_ChiTiet_DichVu(id: number): Observable<any> {
    return this.http
      .get(`${this.API_URL}/chi-tiet?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: any) => {
          this.log(`Lấy ${this._tieuDe} ${id}, kq ${x}`);
        })
      );
  }
  get_xoa(id: number): Observable<any> {
    return this.http
      .delete(`${this.API_URL}/xoa?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: any) => {
          this.log(`xóa ${this._tieuDe} ${x}, kq: ${x}`);
        }),
        catchError(
          this.handleError<any>(`Xóa ${this._tieuDe} thất bại id = ${id}`)
        )
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  //show log lỗi service
  private log(message: string) {
    //this.logMessageService.add(`LoaiPhongService: ${message}`);
    this.logMessageService.add(`LoaiPhongService: ${message}`);
  }
}
