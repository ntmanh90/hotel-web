import { LogMessageService } from '../../shares/_services/logMessage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import{HuongNhin} from '../../danh-muc/_module/huong-nhin.model';
import { BaseService } from '../../shares/_services/base.service';


@Injectable({
  providedIn: 'root'
})
export class HuongNhinService extends BaseService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
   _tieuDe = "hướng nhìn"
  cur_service = 'HuongNhinService';
  API_URL = `${environment.apiUrl}/huongnhin`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private logMessageService: LogMessageService
  ) { super(); }

  get isLoading$() {
    return this._isLoading$.asObservable();
  }

  get_DanhSach(): Observable<HuongNhin[]> {
    this.log(`${this.cur_service}: danh sách ${this._tieuDe}`);
    return this.http.get<HuongNhin[]>(`${this.API_URL}/danh-sach`, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }))
  }

  post_Them_HuongNhin(huongnhin: HuongNhin): Observable<HuongNhin> {
    return this.http.post<HuongNhin>(`${this.API_URL}/them`, huongnhin, this.httpOptions)
      .pipe(catchError(this.handleErrorS));
  }

  put_Sua_HuongNhin(huongnhin: HuongNhin): Observable<HuongNhin> {
    return this.http.put(`${this.API_URL}/sua`, huongnhin, this.httpOptions)
      .pipe(
        tap((x: HuongNhin) => this.log(`Sửa ${this._tieuDe} thành công id = ${huongnhin.iD_HuongNhin}`)),
        catchError(this.handleError<HuongNhin>(`Sửa ${this._tieuDe} Error!`))
      )
  }

  get_ChiTiet_HuongNhin(id: number): Observable<HuongNhin> {
    return this.http.get(`${this.API_URL}/chi-tiet?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: HuongNhin) => { this.log(`Lấy ${this._tieuDe} ${id}, kq ${x}`) })
      )
  }

  get_xoa(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/xoa?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: any) => { this.log(`xóa ${this._tieuDe} ${x}, kq: ${x}`) }),
        catchError(this.handleError<HuongNhin>(`Xóa ${this._tieuDe} thất bại id = ${id}`))
      )
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
  private handleError<T>(operation = 'operation', result?: T) {
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
