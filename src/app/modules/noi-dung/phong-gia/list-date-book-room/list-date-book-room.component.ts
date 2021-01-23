import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  PhongGiaViewTable,
  SearchPhongGiaModel,
  ListPhongGiaModel,
} from "../../_models/phong-gia.model";
import { DialogCaiDatGiaPhongComponent } from "../dialog-cai-dat-gia-phong/dialog-cai-dat-gia-phong.component";
import { DialogDongMoPhongComponent } from "../dialog-dong-mo-phong/dialog-dong-mo-phong.component";

@Component({
  selector: "app-list-date-book-room",
  templateUrl: "./list-date-book-room.component.html",
  styleUrls: ["./list-date-book-room.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDateBookRoomComponent implements OnInit {
  @Input()
  public listPhongGia: PhongGiaViewTable[] = [];
  @Input()
  public listPhongGiaModel: ListPhongGiaModel[] = [];
  @Output()
  public updateData: EventEmitter<any> = new EventEmitter();

  @Output()
  public updateDataMoreDay: EventEmitter<any> = new EventEmitter();
  @Output()
  public updateDataStatusMoreDay: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  public openDialog(event, type, item) {
    console.log(item);
    const dialogRef = this.dialog.open(DialogCaiDatGiaPhongComponent);
    dialogRef.componentInstance.type = type;
    dialogRef.componentInstance.iD_LoaiPhong = item.iD_LoaiPhong;
    dialogRef.componentInstance.titleDialog =
      type === 1 ? "Đặt số phòng để bán" : "Đặt giá phòng để bán";
    this.cd.markForCheck();
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.updateDataMoreDay.emit(result);
      }
    });
  }

  public openDialogDatPhong(event) {
    const dialogRef = this.dialog.open(DialogDongMoPhongComponent);
    this.cd.markForCheck();
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.updateDataStatusMoreDay.emit(result);
      }
    });
  }
  public updateDataInService(event) {
    this.updateData.emit(event);
  }
}
