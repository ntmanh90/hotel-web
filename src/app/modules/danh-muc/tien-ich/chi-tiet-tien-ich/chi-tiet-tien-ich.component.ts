import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { bgCSS } from 'src/app/modules/shares/_models/bgCss.model';
import { TienIch } from '../../_module/tien-ich.model';
import { TienIchService } from '../../_service/tien-ich.service';

const emptyTienIch: TienIch = {
  iD_TienIch: undefined,
  tieuDe: '',
  trangThai: true,
  createBy: '',
  createDate: undefined,
  modifyBy: '',
  modifyDate: undefined,
  nN_ObjectRequests: []
};

@Component({
  selector: 'app-chi-tiet-tien-ich',
  templateUrl: './chi-tiet-tien-ich.component.html',
  styleUrls: ['./chi-tiet-tien-ich.component.scss']
})


export class ChiTietTienIchComponent implements OnInit, OnDestroy {

  @Input() id: number;
  tieuDe = 'tiện ích'
  isLoading$;
  tienIch: TienIch;
  formData: FormGroup;
  tenTrangThai = 'Hoạt động';
  private subscriptions: Subscription[] = [];
  bgcss = new bgCSS();

  constructor(
    private tienIchService: TienIchService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private _snackBar: MatSnackBar,
  ) { }

  loadForm() {
    this.formData = this.fb.group({
      tieuDe: [this.tienIch.tieuDe, Validators.compose([Validators.required])],
      trangThai: [this.tienIch.trangThai],
    });

  }

  loadData() {
    const sb = this.tienIchService.get_ChiTiet_TienIch(this.id).pipe(
      first(),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(emptyTienIch);
      })
    ).subscribe((data: TienIch) => {
      this.tienIch = data;
      console.log(this.tienIch);
      this.loadForm();
    });
    this.subscriptions.push(sb);

  }

  private prepareCustomer() {
    const formValue = this.formData.value;
    this.tienIch.tieuDe = formValue.tieuDe;
    this.tienIch.trangThai = formValue.trangThai;
  }
  resetObject() {
    emptyTienIch.iD_TienIch = undefined;
    emptyTienIch.tieuDe = '';
    emptyTienIch.trangThai = true;
  }

  save() {
    this.prepareCustomer();
    if (this.tienIch.iD_TienIch) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.tienIchService.put_Sua_TienIch(this.tienIch).subscribe((res: TienIch) => {
      this.tienIch = res;
      if (this.tienIch.iD_TienIch > 0) {
        this.modal.dismiss(`Cập nhật ${this.tieuDe}: ${this.tienIch.tieuDe}`);
        this.resetObject();
        return of(this.tienIch);
      }
    }
      , error => {
        this.openSnackBar(error, this.bgcss.Error)
      });
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.tienIchService.post_Them_TienIch(this.tienIch)
      .subscribe((res: TienIch) => {
        this.tienIch = res;
        if (this.tienIch) {
          this.modal.dismiss(`Thêm mới ${this.tieuDe}: ${this.tienIch.tieuDe}`);
          this.resetObject();
          return of(this.tienIch);
        }
      }, error => {
        this.openSnackBar(error, this.bgcss.Error);
      });

    this.subscriptions.push(sbCreate);
  }

  ngOnInit() {
    this.isLoading$ = this.tienIchService.isLoading$;
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
