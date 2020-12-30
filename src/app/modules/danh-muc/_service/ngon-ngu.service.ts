import { LogMessageService } from '../../shares/_services/logMessage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgonNgu } from '../_module/ngonngu.model';
import { BaseService } from '../../shares/_services/base.service';


@Injectable({
  providedIn: 'root'
})
export class NgonNguService extends BaseService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  cur_service = 'NgonNguService';
  API_URL = `${environment.apiUrl}/ngonngu`;

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

  get_DanhSach(): Observable<NgonNgu[]> {
    this.log(`${this.cur_service}: danh sách ngôn ngữ`);
    return this.http.get<NgonNgu[]>(`${this.API_URL}/danh-sach`, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }))
  }

  post_Them_NgonNgu(ngonNgu: NgonNgu): Observable<NgonNgu> {
    return this.http.post<NgonNgu>(`${this.API_URL}/them`, ngonNgu, this.httpOptions)
      .pipe(catchError(this.handleErrorS));
  }

  put_Sua_NgonNgu(ngonNgu: NgonNgu): Observable<NgonNgu> {
    return this.http.put(`${this.API_URL}/sua`, ngonNgu, this.httpOptions)
      .pipe(
        tap((x: NgonNgu) => this.log(`Sửa ngôn ngữ thành công id = ${ngonNgu.iD_NgonNgu}`)),
        catchError(this.handleError<NgonNgu>('post_Them_NgonNgu Error!'))
      )
  }

  get_ChiTiet_NgonNgu(id: number): Observable<NgonNgu> {
    return this.http.get(`${this.API_URL}/chi-tiet?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: NgonNgu) => { this.log(`Lấy ngôn ngữ ${id}, kq ${x}`) })
      )
  }

  get_xoa(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/xoa?id=${id}`, this.httpOptions)
      .pipe(
        tap((x: any) => { this.log('xóa ngôn ngữ ${x}, kq: ${x}') }),
        catchError(this.handleError<NgonNgu>(`Xóa ngôn ngữ thất bại id = ${id}`))
      )
  }

  //show log lỗi service
  private log(message: string) {
    //this.logMessageService.add(`NgonNguService: ${message}`);
    this.logMessageService.add(`NgonNguService: ${message}`);
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
