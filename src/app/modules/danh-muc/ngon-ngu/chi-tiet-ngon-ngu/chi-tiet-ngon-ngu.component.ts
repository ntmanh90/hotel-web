import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { NgonNgu } from '../../_module/ngonngu.model';
import { NgonNguService } from '../../_service/ngon-ngu.service';

const emptyNgonNgu: NgonNgu = {
  iD_NgonNgu: undefined,
  kyHieu: '',
  tieuDe: '',
  createBy: '',
  createDate: undefined,
  modifyBy: '',
  modifyDate: undefined
};

@Component({
  selector: 'app-chi-tiet-ngon-ngu',
  templateUrl: './chi-tiet-ngon-ngu.component.html',
  styleUrls: ['./chi-tiet-ngon-ngu.component.css']
})
export class ChiTietNgonNguComponent implements OnInit, OnDestroy {
  @Input() id: number;
  tieuDe = 'ngôn ngữ'
  isLoading$;
  ngonNgu: NgonNgu;
  formData: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private ngonNguService: NgonNguService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.ngonNguService.isLoading$;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadData() {
    if (!this.id) {
      this.ngonNgu = emptyNgonNgu;
      this.loadForm();
    } else {
      const sb = this.ngonNguService.get_ChiTiet_NgonNgu(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(emptyNgonNgu);
        })
      ).subscribe((data: NgonNgu) => {
        this.ngonNgu = data;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formData = this.fb.group({
      kyHieu: [this.ngonNgu.kyHieu, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      tieuDe: [this.ngonNgu.tieuDe, Validators.compose([Validators.required])],
    });
  }

  save() {
    this.prepareCustomer();
    if (this.ngonNgu.iD_NgonNgu) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.ngonNguService.put_Sua_NgonNgu(this.ngonNgu).subscribe((res: NgonNgu) => {
      this.ngonNgu = res;
      if (this.ngonNgu.iD_NgonNgu > 0) {
        this.modal.dismiss(`Cập nhật ${this.tieuDe}: ${this.ngonNgu.tieuDe}`);
        this.resetObject();
        return of(this.ngonNgu);
      }
    });
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.ngonNguService.post_Them_NgonNgu(this.ngonNgu)
      .subscribe((res: NgonNgu) => {
        this.ngonNgu = res;
        if (this.ngonNgu) {
          this.modal.dismiss(`Thêm mới ${this.tieuDe}: ${this.ngonNgu.tieuDe}`);
          this.resetObject();
          return of(this.ngonNgu);
        }
      }, error => {
        debugger
        error.forEach(itemError => {
          if (this.formData.controls[itemError.error_key] == itemError.error_key) {
            console.log('key',itemError.key);
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

  private prepareCustomer() {
    const formValue = this.formData.value;
    this.ngonNgu.kyHieu = formValue.kyHieu;
    this.ngonNgu.tieuDe = formValue.tieuDe;
  }

  resetObject() {
    emptyNgonNgu.iD_NgonNgu = undefined;
    emptyNgonNgu.tieuDe = '';
    emptyNgonNgu.kyHieu = '';
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
