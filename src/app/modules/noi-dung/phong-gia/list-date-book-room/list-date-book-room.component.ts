import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCaiDatGiaPhongComponent } from '../dialog-cai-dat-gia-phong/dialog-cai-dat-gia-phong.component';
import { DialogDongMoPhongComponent } from '../dialog-dong-mo-phong/dialog-dong-mo-phong.component';

@Component({
  selector: 'app-list-date-book-room',
  templateUrl: './list-date-book-room.component.html',
  styleUrls: ['./list-date-book-room.component.scss']
})
export class ListDateBookRoomComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  public openDialog(event) {

    const dialogRef = this.dialog.open(DialogCaiDatGiaPhongComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public openDialogDatPhong(event) {

    const dialogRef = this.dialog.open(DialogDongMoPhongComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}