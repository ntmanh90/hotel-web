import { AfterViewInit, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { LoaiGiuongService } from "src/app/modules/danh-muc/_service/loai-giuong.service";
import { LoaiGuongSelectMask } from "../../_models/loai-guong-select-mask.model";

@Component({
  selector: "app-dialog-them-thong-tin-loai-guong",
  templateUrl: "./dialog-them-thong-tin-loai-guong.component.html",
  styleUrls: ["./dialog-them-thong-tin-loai-guong.component.scss"],
})
export class DialogThemThongTinLoaiGuongComponent
  implements OnInit, AfterViewInit {
  private subscriptions: Subscription[] = [];
  public isNew: boolean = true;
  public listLoaiGiuong: LoaiGuongSelectMask[] = [];
  public modelSoluong: number = 0;
  public modelLoaiGuong: number = -1;
  public formData: FormGroup;
  constructor(
    private loaiGuongService: LoaiGiuongService,
    private modal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit() {
    // add placeHolder
    if (this.isNew) {
      this.listLoaiGiuong.push({
        id: -1,
        name: "Chọn gường",
      });
    }
    this.builderGroupFormData();
    // load data for server
    this.loadListGuongInService();
  }
  private builderGroupFormData() {
    this.formData = this.formBuilder.group({
      chonguong: [
        this.modelLoaiGuong,
        Validators.compose([Validators.required]),
      ],
      soluong: [this.modelSoluong, Validators.compose([Validators.required])],
    });
  }
  private loadListGuongInService() {
    const sb = this.loaiGuongService.get_DanhSach().subscribe((results) => {
      if (results && results.length > 0) {
        results.forEach((element) => {
          this.listLoaiGiuong.push({
            id: element.iD_LoaiGiuong,
            name: element.tieuDe,
          } as LoaiGuongSelectMask);
        });
      }
    });
    this.subscriptions.push(sb);
  }
  public saveDataAndCloseDialog(event) {
    event.stopPropagation();
    this.modal.close({
      loaiGuong: this.modelLoaiGuong,
      soLuong: this.modelSoluong,
    });
  }
  isControlValid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    let valid = control.valid;
    if (controlName === "chonguong" && control.value === -1) {
      valid = false;
    }
    return valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    let invalid = control.invalid;
    if (controlName === "chonguong" && control.value === -1) {
      invalid = true;
    }
    return invalid && (control.dirty || control.touched);
  }
  controlHasError(validation, controlName): boolean {
    const control = this.formData.controls[controlName];
    let isInvalid = control.hasError(validation);
    if (controlName === "chonguong" && control.value === -1) {
      isInvalid = true;
    }
    return (control.dirty || control.touched) && isInvalid ;
  }
}
