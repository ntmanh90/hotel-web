import { LogMessageService } from "../../shares/_services/logMessage.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

import { BaseService } from "../../shares/_services/base.service";
import { catchError, map, tap } from "rxjs/operators";
import { CreateEditDichVu } from "../_models/create-edit-dich-vu.model";
import { NhomQuyen } from "../_models/nhom-quyen.model";

@Injectable({
  providedIn: "root",
})
export class PhanQuyenService extends BaseService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _tieuDe = "NhomQuyen";
  private cur_service = "NhomQuyenService";
  private slat = "NhomQuyen";
  private API_URL = `${environment.apiUrl}/${this.slat}`;

  protected httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(
    protected http: HttpClient,
    protected logMessageService: LogMessageService
  ) {
    super();
  }
  public get_DanhSach = (): Observable<any[]> => {
    this.log(`${this.cur_service}: danh sách ${this._tieuDe}`);
    return this.http
      .get<any[]>(`${this.API_URL}/danh-sach`, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  };
  public get_xoa(id: number): Observable<any> {
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
  public post_Them_NhomQuyen(nhomQuyen: NhomQuyen): Observable<NhomQuyen> {
    return this.http
      .post<NhomQuyen>(`${this.API_URL}/them`, nhomQuyen, this.httpOptions)
      .pipe(catchError(this.handleErrorS));
  }
  public put_Sua_NhomQuyen(nhomQuyen: NhomQuyen): Observable<NhomQuyen> {
    return this.http
      .put(`${this.API_URL}/sua`, nhomQuyen, this.httpOptions)
      .pipe(
        tap((x: NhomQuyen) =>
          this.log(
            `Sửa ${this._tieuDe} thành công id = ${nhomQuyen.tenNhomQuyen}`
          )
        ),
        catchError(this.handleError<NhomQuyen>(`Sửa ${this._tieuDe} Error!`))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  protected log(message: string) {
    //this.logMessageService.add(`LoaiPhongService: ${message}`);
    this.logMessageService.add(`LoaiPhongService: ${message}`);
  }
}
