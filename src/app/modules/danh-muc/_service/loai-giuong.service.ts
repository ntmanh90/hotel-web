import { LogMessageService } from '../../shares/_services/logMessage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaiGiuong } from '../_module/loai-giuong.model';
import { BaseService } from '../../shares/_services/base.service';


@Injectable({
  providedIn: 'root'
})
export class LoaiGiuongService extends BaseService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
   _tieuDe = "loại giường"
  cur_service = 'LoaiGiuongService';
  API_URL = `${environment.apiUrl}/loaigiuong`;

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

  get_DanhSach(): Observable<LoaiGiuong[]> {
    this.log(`${this.cur_service}: danh sách loại giường`);
    return this.http.get<LoaiGiuong[]>(`${this.API_URL}/danh-sach`, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }))
  }

  post_Them_LoaiGiuong(loaigiuong: LoaiGiuong): Observable<LoaiGiuong> {
    return this.http.post<LoaiGiuong>(`${this.API_URL}/them`, loaigiuong, this.httpOptions)
      .pipe(catchError(this.handleErrorS));
  }

  put_Sua_LoaiGiuong(loaigiuong: LoaiGiuong): Observable<LoaiGiuong> {
    return this.http.put(`${this.API_URL}/sua`, loaigiuong, this.httpOptions)
      .pipe(
        tap((x: LoaiGiuong) => this.log(`Sửa ${this._tieuDe} thành công id = ${loaigiuong.iD_LoaiGiuong}`)),
        catchError(this.handleError<LoaiGiuong>(`Sửa ${this._tieuDe} Error!`))
      )
  }

  get_ChiTiet_LoaiGiuong(id: number): Observable<LoaiGiuong> {
    return this.http.get(`${this.API_URL}/chi-tiet?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: LoaiGiuong) => { this.log(`Lấy ${this._tieuDe} ${id}, kq ${x}`) })
      )
  }

  get_xoa(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/xoa?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: any) => { this.log(`xóa ${this._tieuDe} ${x}, kq: ${x}`) }),
        catchError(this.handleError<LoaiGiuong>(`Xóa ${this._tieuDe} thất bại id = ${id}`))
      )
  }

  //show log lỗi service
  private log(message: string) {
    //this.logMessageService.add(`LoaiGiuongService: ${message}`);
    this.logMessageService.add(`LoaiGiuongService: ${message}`);
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
