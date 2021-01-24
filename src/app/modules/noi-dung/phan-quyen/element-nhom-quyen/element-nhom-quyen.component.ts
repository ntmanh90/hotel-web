import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { bgCSS } from "src/app/modules/shares/_models/bgCss.model";
import { DanhSachNhomQuyen, NhomQuyen } from "../../_models/nhom-quyen.model";
import { PhanQuyenService } from "../../_services/phan-quyen.service";
import { DialogChiTietNhomQuyenComponent } from "../dialog-chi-tiet-nhom-quyen/dialog-chi-tiet-nhom-quyen.component";

@Component({
  selector: "app-element-nhom-quyen",
  templateUrl: "./element-nhom-quyen.component.html",
  styleUrls: ["./element-nhom-quyen.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementNhomQuyenComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public listNhomQuyen: DanhSachNhomQuyen[] = [];
  public activeNhomQuyen: DanhSachNhomQuyen;
  private bgcss = new bgCSS();
  constructor(
    private modalService: NgbModal,
    private phanQuyenService: PhanQuyenService,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAllDataPhanQuyen();
  }
  private loadAllDataPhanQuyen() {
    const subLoadAll = this.phanQuyenService.get_DanhSach().subscribe((res) => {
      this.listNhomQuyen = res;
      if (!this.activeNhomQuyen && this.listNhomQuyen.length > 0) {
        this.activeNhomQuyen = this.listNhomQuyen[0];
      }
      for (let index = 0; index < this.listNhomQuyen.length; index++) {
        const element = this.listNhomQuyen[index];
        if (this.activeNhomQuyen.iD_NhomQuyen === element.iD_NhomQuyen) {
          element.select = true;
        } else {
          element.select = false;
        }
      }
      this.cd.markForCheck();
    });
    this.subscriptions.push(subLoadAll);
  }
  public openDialogChiTietNhomQuyen(event) {
    let data: NhomQuyen;
    if (isNaN(event) && event) {
      data = {
        iD_NhomQuyen: event.iD_NhomQuyen,
        tenNhomQuyen: event.tenNhomQuyen,
      };
    } else {
      data = {
        iD_NhomQuyen: 0,
        tenNhomQuyen: "",
      };
    }
    const modal = this.modalService.open(DialogChiTietNhomQuyenComponent);
    modal.componentInstance.detailNhomQuyen = data;
    if (data.iD_NhomQuyen !== 0) {
      modal.componentInstance.titleDialog =
        "Sửa thông tin nhóm quyền " + data.tenNhomQuyen;
    }
    modal.closed.subscribe((res) => {
      if (res) {
        this.loadAllDataPhanQuyen();
      }
    });
  }
  public deleteNhomQuyen(value) {
    if (value) {
      this.phanQuyenService.get_xoa(value.iD_NhomQuyen).subscribe((x: any) => {
        if (x.kq) {
          this.openSnackBar(
            `Xóa ${value.tenNhomQuyen} thành công!`,
            this.bgcss.Success
          );
          this.loadAllDataPhanQuyen();
        }
      });
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
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  public seletcNhomQuyen(nhomQuyen: DanhSachNhomQuyen) {
    for (let index = 0; index < this.listNhomQuyen.length; index++) {
      const element = this.listNhomQuyen[index];
      if (element.iD_NhomQuyen === nhomQuyen.iD_NhomQuyen) {
        element.select = true;
        this.activeNhomQuyen = element;
      } else {
        element.select = false;
      }
    }
    this.cd.markForCheck();
  }
}
