import { LogMessageService } from '../../shares/_services/logMessage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import{SoNguoiToiDa} from '../../danh-muc/_module/so-nguoi-toi-da.model';
import { BaseService } from '../../shares/_services/base.service';


@Injectable({
  providedIn: 'root'
})
export class SoNguoiToiDaService extends BaseService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
   _tieuDe = "số người tối đa"
  cur_service = 'SoNguoiToiDaService';
  API_URL = `${environment.apiUrl}/songuoitoida`;

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

  get_DanhSach(): Observable<SoNguoiToiDa[]> {
    this.log(`${this.cur_service}: danh sách ${this._tieuDe}`);
    return this.http.get<SoNguoiToiDa[]>(`${this.API_URL}/danh-sach`, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }))
  }

  post_Them_SoNguoiToiDa(songuoitoida: SoNguoiToiDa): Observable<SoNguoiToiDa> {
    return this.http.post<SoNguoiToiDa>(`${this.API_URL}/them`, songuoitoida, this.httpOptions)
      .pipe(catchError(this.handleErrorS));
  }

  put_Sua_SoNguoiToiDa(songuoitoida: SoNguoiToiDa): Observable<SoNguoiToiDa> {
    return this.http.put(`${this.API_URL}/sua`, songuoitoida, this.httpOptions)
      .pipe(
        tap((x: SoNguoiToiDa) => this.log(`Sửa ${this._tieuDe} thành công id = ${songuoitoida.iD_SoNguoiToiDa}`)),
        catchError(this.handleError<SoNguoiToiDa>(`Sửa ${this._tieuDe} Error!`))
      )
  }

  get_ChiTiet_SoNguoiToiDa(id: number): Observable<SoNguoiToiDa> {
    return this.http.get(`${this.API_URL}/chi-tiet?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: SoNguoiToiDa) => { this.log(`Lấy ${this._tieuDe} ${id}, kq ${x}`) })
      )
  }

  get_xoa(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/xoa?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: any) => { this.log(`xóa ${this._tieuDe} ${x}, kq: ${x}`) }),
        catchError(this.handleError<SoNguoiToiDa>(`Xóa ${this._tieuDe} thất bại id = ${id}`))
      )
  }

  //show log lỗi service
  private log(message: string) {
    //this.logMessageService.add(`SoNguoiToiDaService: ${message}`);
    this.logMessageService.add(`SoNguoiToiDaService: ${message}`);
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
