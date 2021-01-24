import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
import { bgCSS } from "src/app/modules/shares/_models/bgCss.model";
import { NhomQuyen } from "../../_models/nhom-quyen.model";
import { PhanQuyenService } from "../../_services/phan-quyen.service";

@Component({
  selector: "app-dialog-chi-tiet-nhom-quyen",
  templateUrl: "./dialog-chi-tiet-nhom-quyen.component.html",
  styleUrls: ["./dialog-chi-tiet-nhom-quyen.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DialogChiTietNhomQuyenComponent implements OnInit, OnDestroy {
  public titleDialog = "Thêm thông tin nhóm tài khoản";
  public formData;
  public validation: ValidationComponent;
  private _detailNhomQuyen: NhomQuyen = {
    iD_NhomQuyen: 0,
    tenNhomQuyen: "",
  };
  private bgcss = new bgCSS();
  private subscriptions: Subscription[] = [];
  constructor(
    public modal: NgbActiveModal,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private phanQuyenService: PhanQuyenService
  ) {}
  public set detailNhomQuyen(value) {
    this._detailNhomQuyen = value;
    this.loadFormData();
  }
  ngOnInit() {}
  public closeDialogSaveData(event) {
    console.log(this.isValidForm);
    if (!this.isValidForm) {
      return;
    }
    const formValue = this.formData.value;
    this._detailNhomQuyen.tenNhomQuyen = formValue.tenNhomQuyen;
    if (this._detailNhomQuyen.iD_NhomQuyen === 0) {
      const subCreate = this.phanQuyenService
        .post_Them_NhomQuyen(this._detailNhomQuyen)
        .subscribe(
          (res: NhomQuyen) => {
            if (res) {
              this.modal.close(
                `Thêm mới ${res.tenNhomQuyen}: ${res.tenNhomQuyen}`
              );
              return of(res);
            }
          },
          (error) => {
            this.openSnackBar(error, this.bgcss.Error);
          }
        );
      this.subscriptions.push(subCreate);
    } else {
      const subUpdate = this.phanQuyenService
        .put_Sua_NhomQuyen(this._detailNhomQuyen)
        .subscribe(
          (res: NhomQuyen) => {
            if (res) {
              this.modal.close(`Sửa ${res.tenNhomQuyen}: ${res.tenNhomQuyen}`);
              return of(res);
            }
          },
          (error) => {
            this.openSnackBar(error, this.bgcss.Error);
          }
        );
      this.subscriptions.push(subUpdate);
    }
  }
  private openSnackBar(action, bgCss) {
    this._snackBar.open(action, "x", {
      duration: 2500,
      panelClass: [bgCss],
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }
  public closeDialogNotSaveData(event) {
    this.modal.close(event);
  }
  public get isValidForm() {
    return this.formData.valid;
  }
  private loadFormData() {
    this.formData = this.fb.group({
      tenNhomQuyen: [
        this._detailNhomQuyen.tenNhomQuyen,
        Validators.compose([Validators.required]),
      ],
    });
    this.validation = new ValidationComponent(this.formData);
  }
  public get detailNhomQuyen(){
    return this._detailNhomQuyen;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
