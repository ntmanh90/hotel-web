import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { bgCSS } from 'src/app/modules/shares/_models/bgCss.model';
import { SoNguoiToiDa } from '../../_module/so-nguoi-toi-da.model';
import { SoNguoiToiDaService } from '../../_service/so-nguoi-toi-da.service';


const emptySoNguoiToiDa: SoNguoiToiDa = {
  iD_SoNguoiToiDa: undefined,
  tieuDe: '',
  trangThai: true,
  createBy: '',
  createDate: undefined,
  modifyBy: '',
  modifyDate: undefined,
  nN_ObjectRequests: []
};

@Component({
  selector: 'app-chi-tiet-so-nguoi-toi-da',
  templateUrl: './chi-tiet-so-nguoi-toi-da.component.html',
  styleUrls: ['./chi-tiet-so-nguoi-toi-da.component.scss']
})


export class ChiTietSoNguoiToiDaComponent implements OnInit, OnDestroy {

  @Input() id: number;
  tieuDe = 'số người tối đa'
  isLoading$;
  soNguoiToiDa: SoNguoiToiDa;
  formData: FormGroup;
  tenTrangThai = 'Hoạt động';
  private subscriptions: Subscription[] = [];
  bgcss = new bgCSS();

  constructor(
    private soNguoiToiDaService: SoNguoiToiDaService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private _snackBar: MatSnackBar,
  ) { }

  loadForm() {
    this.formData = this.fb.group({
      tieuDe: [this.soNguoiToiDa.tieuDe, Validators.compose([Validators.required])],
      trangThai: [this.soNguoiToiDa.trangThai],
    });

  }

  loadData() {
    const sb = this.soNguoiToiDaService.get_ChiTiet_SoNguoiToiDa(this.id).pipe(
      first(),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(emptySoNguoiToiDa);
      })
    ).subscribe((data: SoNguoiToiDa) => {
      this.soNguoiToiDa = data;
      console.log(this.soNguoiToiDa);
      this.loadForm();
    });
    this.subscriptions.push(sb);

  }

  private prepareCustomer() {
    const formValue = this.formData.value;
    this.soNguoiToiDa.tieuDe = formValue.tieuDe;
    this.soNguoiToiDa.trangThai = formValue.trangThai;
  }
  resetObject() {
    emptySoNguoiToiDa.iD_SoNguoiToiDa = undefined;
    emptySoNguoiToiDa.tieuDe = '';
    emptySoNguoiToiDa.trangThai = true;
  }

  save() {
    this.prepareCustomer();
    if (this.soNguoiToiDa.iD_SoNguoiToiDa) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.soNguoiToiDaService.put_Sua_SoNguoiToiDa(this.soNguoiToiDa).subscribe((res: SoNguoiToiDa) => {
      this.soNguoiToiDa = res;
      if (this.soNguoiToiDa.iD_SoNguoiToiDa > 0) {
        this.modal.dismiss(`Cập nhật ${this.tieuDe}: ${this.soNguoiToiDa.tieuDe}`);
        this.resetObject();
        return of(this.soNguoiToiDa);
      }
    }
      , error => {
        this.openSnackBar(error, this.bgcss.Error)
      });
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.soNguoiToiDaService.post_Them_SoNguoiToiDa(this.soNguoiToiDa)
      .subscribe((res: SoNguoiToiDa) => {
        this.soNguoiToiDa = res;
        if (this.soNguoiToiDa) {
          this.modal.dismiss(`Thêm mới ${this.tieuDe}: ${this.soNguoiToiDa.tieuDe}`);
          this.resetObject();
          return of(this.soNguoiToiDa);
        }
      }, error => {
        this.openSnackBar(error, this.bgcss.Error);
      });

    this.subscriptions.push(sbCreate);
  }

  ngOnInit() {
    this.isLoading$ = this.soNguoiToiDaService.isLoading$;
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
