import { LogMessageService } from '../../shares/_services/logMessage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import{HuongNhin} from '../../danh-muc/_module/huong-nhin.model';
import{TienIch} from '../../danh-muc/_module/tien-ich.model';
import{SoNguoiToiDa} from '../../danh-muc/_module/so-nguoi-toi-da.model';
import{LoaiGiuong} from '../../danh-muc/_module/loai-giuong.model';

import { BaseService } from '../../shares/_services/base.service';
import { LoaiPhongVM } from '../_models/loai-phong-vm.model';
import { LoaiPhong } from '../_models/loai-phong.model';


@Injectable({
  providedIn: 'root'
})
export class LoaiPhongService extends BaseService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
   _tieuDe = "loại phòng"
  cur_service = 'LoaiPhongService';
  API_URL = `${environment.apiUrl}/loaiphong`;

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

  get_DanhSach(): Observable<LoaiPhongVM[]> {
    this.log(`${this.cur_service}: danh sách ${this._tieuDe}`);
    return this.http.get<LoaiPhongVM[]>(`${this.API_URL}/danh-sach`, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }))
  }

  post_Them_LoaiPhong(loaiphong: LoaiPhong): Observable<LoaiPhong> {
    return this.http.post<LoaiPhong>(`${this.API_URL}/them`, loaiphong, this.httpOptions)
      .pipe(catchError(this.handleErrorS));
  }

  put_Sua_LoaiPhong(loaiphong: LoaiPhong): Observable<LoaiPhong> {
    return this.http.put(`${this.API_URL}/sua`, loaiphong, this.httpOptions)
      .pipe(
        tap((x: LoaiPhong) => this.log(`Sửa ${this._tieuDe} thành công id = ${loaiphong.iD_LoaiPhong}`)),
        catchError(this.handleError<LoaiPhong>(`Sửa ${this._tieuDe} Error!`))
      )
  }

  get_ChiTiet_LoaiPhong(id: number): Observable<LoaiPhong> {
    return this.http.get(`${this.API_URL}/chi-tiet?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: LoaiPhong) => { this.log(`Lấy ${this._tieuDe} ${id}, kq ${x}`) })
      )
  }

  get_xoa(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/xoa?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: any) => { this.log(`xóa ${this._tieuDe} ${x}, kq: ${x}`) }),
        catchError(this.handleError<LoaiPhong>(`Xóa ${this._tieuDe} thất bại id = ${id}`))
      )
  }

  //show log lỗi service
  private log(message: string) {
    //this.logMessageService.add(`LoaiPhongService: ${message}`);
    this.logMessageService.add(`LoaiPhongService: ${message}`);
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
