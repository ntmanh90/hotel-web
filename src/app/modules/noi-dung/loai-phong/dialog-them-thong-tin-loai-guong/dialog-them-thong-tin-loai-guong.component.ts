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
import { ValidationComponent } from "src/app/modules/shares/validation/validation.component";
import { nN_LoaiPhongRequests } from "../../_models/loai-phong.model";

@Component({
  selector: "app-dialog-them-thong-tin-loai-guong",
  templateUrl: "./dialog-them-thong-tin-loai-guong.component.html",
  styleUrls: ["./dialog-them-thong-tin-loai-guong.component.scss"],
})
export class DialogThemThongTinLoaiGuongComponent
  implements OnInit, AfterViewInit {
  private subscriptions: Subscription[] = [];
  public isNew: boolean = true;
  public listLoaiGiuong: nN_LoaiPhongRequests[] = [];
  public modelSoluong: number = 0;
  public modelLoaiGuong: number = -1;
  public formData: FormGroup;
  public validation: ValidationComponent;
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
        iD_LoaiGiuong: -1,
        tieuDe: "Chọn gường",
      });
    }
    this.builderGroupFormData();
    // load data for server
    this.loadListGuongInService();
  }
  private builderGroupFormData() {
    this.formData = this.formBuilder.group({
      iD_LoaiGiuong: [
        this.modelLoaiGuong,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      soluong: [
        this.modelSoluong,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(100),
        ]),
      ],
    });
    this.validation = new ValidationComponent(this.formData);
  }
  private loadListGuongInService() {
    const sb = this.loaiGuongService.get_DanhSach().subscribe((results) => {
      if (results && results.length > 0) {
        results.forEach((element) => {
          this.listLoaiGiuong.push({
            iD_LoaiGiuong: element.iD_LoaiGiuong,
            tieuDe: element.tieuDe,
          } as nN_LoaiPhongRequests);
        });
      }
    });
    this.subscriptions.push(sb);
  }
  public saveDataAndCloseDialog(event) {
    if (
      this.modelLoaiGuong !== -1 &&
      (this.modelSoluong >= 0 || this.modelSoluong <= 100)
    ) {
      this.modal.close({
        iD_LoaiGiuong: this.modelLoaiGuong,
        tieuDe: this.getTenLoaiGuong(),
        soLuong: this.modelSoluong,
      } as nN_LoaiPhongRequests);
    }
  }
  private getTenLoaiGuong(): string {
    for (let index = 0; index < this.listLoaiGiuong.length; index++) {
      const element: any = this.listLoaiGiuong[index];
      if (element.iD_LoaiGiuong === this.modelLoaiGuong) {
        return element.tieuDe;
      }
    }
    return "";
  }
}
