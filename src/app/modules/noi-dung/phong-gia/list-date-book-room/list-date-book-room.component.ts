import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PhongGiaViewTable, SearchPhongGiaModel, ListPhongGiaModel } from "../../_models/phong-gia.model";
import { DialogCaiDatGiaPhongComponent } from "../dialog-cai-dat-gia-phong/dialog-cai-dat-gia-phong.component";
import { DialogDongMoPhongComponent } from "../dialog-dong-mo-phong/dialog-dong-mo-phong.component";

@Component({
  selector: "app-list-date-book-room",
  templateUrl: "./list-date-book-room.component.html",
  styleUrls: ["./list-date-book-room.component.scss"],
})
export class ListDateBookRoomComponent implements OnInit {
  @Input()
  public listPhongGia: PhongGiaViewTable[] = [];
  @Input()
  public listPhongGiaModel : ListPhongGiaModel[]= [];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  
  public openDialog(event) {
    const dialogRef = this.dialog.open(DialogCaiDatGiaPhongComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public openDialogDatPhong(event) {
    const dialogRef = this.dialog.open(DialogDongMoPhongComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
