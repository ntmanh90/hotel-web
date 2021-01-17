import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-dong-mo-phong',
  templateUrl: './dialog-dong-mo-phong.component.html',
  styleUrls: ['./dialog-dong-mo-phong.component.scss']
})
export class DialogDongMoPhongComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialog.closeAll();
  }

}
