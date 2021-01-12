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
import { ValidationDataComponent } from "src/app/modules/shares/validation-module/validation-data.component";
import { LoaiGuongSelectMask } from "../../_models/loai-guong-select-mask.model";
import { LoaiGuongVaSoluong } from "../../_models/loai-guong-so-luong.model";

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
  public validation :  ValidationDataComponent = new ValidationDataComponent();
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
    this.validation.formData = this.formData;
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
    if(this.modelLoaiGuong !== -1 && (this.modelSoluong >= 0 || this.modelSoluong <= 100)){
      this.modal.close({
        id: this.modelLoaiGuong,
        name: this.getTenLoaiGuong(),
        soLuong: this.modelSoluong,
      } as LoaiGuongVaSoluong);
    }
  }
  private getTenLoaiGuong(): string {
    for (let index = 0; index < this.listLoaiGiuong.length; index++) {
      const element = this.listLoaiGiuong[index];
      if(element.id === this.modelLoaiGuong){
        return element.name
      }
    }
    return ""
  }
}
