import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { LoaiGiuong } from '../../_module/loai-giuong.model';
import { LoaiGiuongService } from '../../_service/loai-giuong.service';


const emptyLoaiGiuong: LoaiGiuong = {
  iD_LoaiGiuong: undefined,
  tieuDe: '',
  trangThai: true,
  createBy: '',
  createDate: undefined,
  modifyBy: '',
  modifyDate: undefined,
  nN_ObjectRequests: []
};
@Component({
  selector: 'app-chi-tiet-loai-giuong',
  templateUrl: './chi-tiet-loai-giuong.component.html',
  styleUrls: ['./chi-tiet-loai-giuong.component.scss']
})
export class ChiTietLoaiGiuongComponent implements OnInit, OnDestroy {

  @Input() id: number;
  tieuDe = 'loại giường'
  isLoading$;
  loaiGiuong: LoaiGiuong;
  formData: FormGroup;
  tenTrangThai = 'Hoạt động';
  private subscriptions: Subscription[] = [];

  constructor(
    private loaiGiuongService: LoaiGiuongService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) { }

  loadForm() {
    this.formData = this.fb.group({
      tieuDe: [this.loaiGiuong.tieuDe, Validators.compose([Validators.required])],
      trangThai: [this.loaiGiuong.trangThai],
    });

  }

  loadData() {
    const sb = this.loaiGiuongService.get_ChiTiet_LoaiGiuong(this.id).pipe(
      first(),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(emptyLoaiGiuong);
      })
    ).subscribe((data: LoaiGiuong) => {
      this.loaiGiuong = data;
      console.log(this.loaiGiuong);
      this.loadForm();
    });
    this.subscriptions.push(sb);

  }

  private prepareCustomer() {
    const formValue = this.formData.value;
    this.loaiGiuong.tieuDe = formValue.tieuDe;
    this.loaiGiuong.trangThai = formValue.trangThai;
  }
  resetObject() {
    emptyLoaiGiuong.iD_LoaiGiuong = undefined;
    emptyLoaiGiuong.tieuDe = '';
    emptyLoaiGiuong.trangThai = true;
  }

  save() {
    this.prepareCustomer();
    if (this.loaiGiuong.iD_LoaiGiuong) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.loaiGiuongService.put_Sua_LoaiGiuong(this.loaiGiuong).subscribe((res: LoaiGiuong) => {
      this.loaiGiuong = res;
      if (this.loaiGiuong.iD_LoaiGiuong > 0) {
        this.modal.dismiss(`Cập nhật ${this.tieuDe}: ${this.loaiGiuong.tieuDe}`);
        this.resetObject();
        return of(this.loaiGiuong);
      }
    });
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.loaiGiuongService.post_Them_LoaiGiuong(this.loaiGiuong)
      .subscribe((res: LoaiGiuong) => {
        this.loaiGiuong = res;
        if (this.loaiGiuong) {
          this.modal.dismiss(`Thêm mới ${this.tieuDe}: ${this.loaiGiuong.tieuDe}`);
          this.resetObject();
          return of(this.loaiGiuong);
        }
      }, error => {
        debugger
        error.forEach(itemError => {
          if (this.formData.controls[itemError.error_key] == itemError.error_key) {
            console.log('key', itemError.key);
            //this.formData.controls[item.key].setErrors({'required': true});
            let control = this.formData.controls[itemError.key];
            console.log('control', control);
            control.dirty;
            control.invalid;
          }
        });
      }
      );

    this.subscriptions.push(sbCreate);
  }

  ngOnInit() {
    this.isLoading$ = this.loaiGiuongService.isLoading$;
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
