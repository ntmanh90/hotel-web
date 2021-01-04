import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { bgCSS } from 'src/app/modules/shares/_models/bgCss.model';

import { HuongNhin } from '../../_module/huong-nhin.model';
import { HuongNhinService } from '../../_service/huong-nhin.service';

const emptyHuongNhin: HuongNhin = {
  iD_HuongNhin: undefined,
  tieuDe: '',
  trangThai: true,
  createBy: '',
  createDate: undefined,
  modifyBy: '',
  modifyDate: undefined,
  nN_ObjectRequests: []
};

@Component({
  selector: 'app-chi-tiet-huong-nhin',
  templateUrl: './chi-tiet-huong-nhin.component.html',
  styleUrls: ['./chi-tiet-huong-nhin.component.scss']
})

export class ChiTietHuongNhinComponent implements OnInit, OnDestroy {

  @Input() id: number;
  tieuDe = 'hướng nhìn'
  isLoading$;
  huongNhin: HuongNhin;
  formData: FormGroup;
  tenTrangThai = 'Hoạt động';
  private subscriptions: Subscription[] = [];
  bgcss = new bgCSS();

  constructor(
    private huongNhinService: HuongNhinService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private _snackBar: MatSnackBar,
  ) { }

  loadForm() {
    this.formData = this.fb.group({
      tieuDe: [this.huongNhin.tieuDe, Validators.compose([Validators.required])],
      trangThai: [this.huongNhin.trangThai],
    });

  }

  loadData() {
    const sb = this.huongNhinService.get_ChiTiet_HuongNhin(this.id).pipe(
      first(),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(emptyHuongNhin);
      })
    ).subscribe((data: HuongNhin) => {
      this.huongNhin = data;
      console.log(this.huongNhin);
      this.loadForm();
    });
    this.subscriptions.push(sb);

  }

  private prepareCustomer() {
    const formValue = this.formData.value;
    this.huongNhin.tieuDe = formValue.tieuDe;
    this.huongNhin.trangThai = formValue.trangThai;
  }
  resetObject() {
    emptyHuongNhin.iD_HuongNhin = undefined;
    emptyHuongNhin.tieuDe = '';
    emptyHuongNhin.trangThai = true;
  }

  save() {
    this.prepareCustomer();
    if (this.huongNhin.iD_HuongNhin) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.huongNhinService.put_Sua_HuongNhin(this.huongNhin).subscribe((res: HuongNhin) => {
      this.huongNhin = res;
      if (this.huongNhin.iD_HuongNhin > 0) {
        this.modal.dismiss(`Cập nhật ${this.tieuDe}: ${this.huongNhin.tieuDe}`);
        this.resetObject();
        return of(this.huongNhin);
      }
    }
      , error => {
        this.openSnackBar(error, this.bgcss.Error)
      });
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.huongNhinService.post_Them_HuongNhin(this.huongNhin)
      .subscribe((res: HuongNhin) => {
        this.huongNhin = res;
        if (this.huongNhin) {
          this.modal.dismiss(`Thêm mới ${this.tieuDe}: ${this.huongNhin.tieuDe}`);
          this.resetObject();
          return of(this.huongNhin);
        }
      }, error => {
        this.openSnackBar(error, this.bgcss.Error);
      });

    this.subscriptions.push(sbCreate);
  }

  ngOnInit() {
    this.isLoading$ = this.huongNhinService.isLoading$;
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

