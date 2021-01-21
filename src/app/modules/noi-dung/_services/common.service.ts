import { LogMessageService } from "../../shares/_services/logMessage.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { BaseService } from "../../shares/_services/base.service";
import { HuongNhin } from "../_models/huong-nhin.model";
import { SoNguoiToiDa } from "../_models/so-nguoi-toi-da.model";
import { NgonNgu } from "../../danh-muc/_module/ngonngu.model";
import { LoaiPhongVM } from "../_models/loai-phong-vm.model";

@Injectable({
  providedIn: "root",
})
export class CommonService extends BaseService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  cur_service = "CommonService";
  API_URL = `${environment.apiUrl}`;

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

  get isLoading$() {
    return this._isLoading$.asObservable();
  }

  get_All_HuongNhin(): Observable<HuongNhin[]> {
    return this.http
      .get<HuongNhin[]>(`${this.API_URL}/huongnhin/danh-sach`, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  get_All_SoNguoiToiDa(): Observable<SoNguoiToiDa[]> {
    return this.http
      .get<SoNguoiToiDa[]>(
        `${this.API_URL}/songuoitoida/danh-sach`,
        this.httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  get_All_LoaiGiuong(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.API_URL}/loaigiuong/danh-sach`, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  get_All_TienIch(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.API_URL}/tienich/danh-sach`, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  get_DanhSachNgonNgu(): Observable<NgonNgu[]> {
    this.log(`${this.cur_service}: danh sách ngôn ngữ`);
    return this.http
      .get<NgonNgu[]>(`${this.API_URL}/ngonngu/danh-sach`, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  get_DanhSachLoaiPhong(): Observable<LoaiPhongVM[]> {
    this.log(`${this.cur_service}: danh sách loại phòng`);
    return this.http
      .get<LoaiPhongVM[]>(
        `${this.API_URL}/loaiphong/danh-sach`,
        this.httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  //show log lỗi service
  private log(message: string) {
    //this.logMessageService.add(`HuongNhinService: ${message}`);
    this.logMessageService.add(`HuongNhinService: ${message}`);
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
}
