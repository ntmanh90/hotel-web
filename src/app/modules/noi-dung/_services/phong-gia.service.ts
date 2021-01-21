import { LogMessageService } from "../../shares/_services/logMessage.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

import { BaseService } from "../../shares/_services/base.service";
import { map } from "rxjs/operators";
import { SearchPhongGiaModel } from "../_models/phong-gia.model";

@Injectable({
  providedIn: "root",
})
export class PhongGiaService extends BaseService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  _tieuDe = "Phòng giá ";
  cur_service = "PhongGiaService";
  API_URL = `${environment.apiUrl}/CaiDatBanPhong`;

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
  get_DanhSach(searchValue: SearchPhongGiaModel): Observable<any[]> {
    this.log(`${this.cur_service}: danh sách ${this._tieuDe}`);
    return this.http
      .get<any[]>(
        `${this.API_URL}/danh-sach?TuNgay=` +
          searchValue.TuNgay +
          `&KhoangNgay=` +
          searchValue.KhoangNgay,
        this.httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
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
