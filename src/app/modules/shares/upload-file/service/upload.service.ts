import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

import { catchError, map, tap } from "rxjs/operators";
import { BaseService } from "../../_services/base.service";
import { LogMessageService } from "../../_services/logMessage.service";

@Injectable({
  providedIn: "root",
})
export class UploadImageService extends BaseService {
  protected _isLoading$ = new BehaviorSubject<boolean>(false);
  protected _tieuDe = "dịch vụ";
  protected cur_service = "UploadService";
  protected slat = "Upload";
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
  postFile(fileToUpload: File): Observable<object> {
    const uploadPath = this.API_URL + "/upload-file";
    const formData: FormData = new FormData();
    let fileName = fileToUpload && fileToUpload.name ? fileToUpload.name : "";
    formData.append("FileUploads", fileToUpload, fileName);
    return this.http.post(uploadPath, formData, this.httpOptions).pipe(
      tap(
        // Log the result or error
        (response: Response) => {
          return response;
        },
        (error) => {
          return this.log(error);
        }
      )
    );
  }
  get_DanhSach(): Observable<any[]> {
    this.log(`${this.cur_service}: danh sách ${this._tieuDe}`);
    return this.http
      .get<any[]>(`${this.API_URL}/list-file`, this.httpOptions)
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
