import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { bgCSS } from 'src/app/modules/shares/_models/bgCss.model';
import { LoaiPhong } from '../../_models/loai-phong.model';
import { LoaiPhongService } from '../../_services/loai-phong.service';

const emptyLoaiPhong: LoaiPhong = {
anhDaiDien: '',
createBy: '',
createDate: undefined,
iD_LoaiPhong: undefined,
kichThuoc: 0,
maLoaiPhong: '',
modifyBy: '',
modifyDate: undefined,
tenLoaiPhong:'',
id_HuongNhin: 0,
id_SoNguoiToiDa: 0,
trangThai: true,
nN_ObjectRequests: [],
loaiPhong_Gallery_Requests: [],
loaiPhong_LoaiGiuong_Request: [],
loaiPhong_TienIch_Request: []

};

@Component({
  selector: 'app-chi-tiet-loai-phong',
  templateUrl: './chi-tiet-loai-phong.component.html',
  styleUrls: ['./chi-tiet-loai-phong.component.scss']
})


export class ChiTietLoaiPhongComponent implements OnInit, OnDestroy {

  @Input() id: number;
  tieuDe = 'loại phòng'
  isLoading$;
  loaiPhong: LoaiPhong;
  formData: FormGroup;
  tenTrangThai = 'Hoạt động';
  private subscriptions: Subscription[] = [];
  bgcss = new bgCSS();

  constructor(
    private loaiPhongService: LoaiPhongService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private _snackBar: MatSnackBar,
  ) { }

  loadForm() {
    this.formData = this.fb.group({
      tieuDe: [this.loaiPhong.tenLoaiPhong, Validators.compose([Validators.required])],
      trangThai: [this.loaiPhong.trangThai],
    });

  }

  loadData() {
    const sb = this.loaiPhongService.get_ChiTiet_LoaiPhong(this.id).pipe(
      first(),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(emptyLoaiPhong);
      })
    ).subscribe((data: LoaiPhong) => {
      this.loaiPhong = data;
      console.log(this.loaiPhong);
      this.loadForm();
    });
    this.subscriptions.push(sb);

  }

  //gán dữ liệu từ formData vào Object
  private prepareCustomer() {
    const formValue = this.formData.value;
    this.loaiPhong.tenLoaiPhong = formValue.tieuDe;
    this.loaiPhong.trangThai = formValue.trangThai;
  }
  resetObject() {
    emptyLoaiPhong.iD_LoaiPhong = undefined;
    emptyLoaiPhong.tenLoaiPhong = '';
    emptyLoaiPhong.trangThai = true;
  }

  save() {
    this.prepareCustomer();
    if (this.loaiPhong.iD_LoaiPhong) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.loaiPhongService.put_Sua_LoaiPhong(this.loaiPhong).subscribe((res: LoaiPhong) => {
      this.loaiPhong = res;
      if (this.loaiPhong.iD_LoaiPhong > 0) {
        this.modal.dismiss(`Cập nhật ${this.tieuDe}: ${this.loaiPhong.tenLoaiPhong}`);
        this.resetObject();
        return of(this.loaiPhong);
      }
    }
      , error => {
        this.openSnackBar(error, this.bgcss.Error)
      });
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.loaiPhongService.post_Them_LoaiPhong(this.loaiPhong)
      .subscribe((res: LoaiPhong) => {
        this.loaiPhong = res;
        if (this.loaiPhong) {
          this.modal.dismiss(`Thêm mới ${this.tieuDe}: ${this.loaiPhong.tenLoaiPhong}`);
          this.resetObject();
          return of(this.loaiPhong);
        }
      }, error => {
        this.openSnackBar(error, this.bgcss.Error);
      });

    this.subscriptions.push(sbCreate);
  }

  ngOnInit() {
    this.isLoading$ = this.loaiPhongService.isLoading$;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  getTenTrangThai(): void {
    if (this.formData.value.trangThai)
      this.tenTrangThai = "Hoạt động";
    else
      this.tenTrangThai = "Khóa";
  }

  openSnackBar(action, bgCss) {
    this._snackBar.open(action, 'x', {
      duration: 2500,
      panelClass: [bgCss],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formData.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formData.controls[controlName];
    return control.dirty || control.touched;
  }

}