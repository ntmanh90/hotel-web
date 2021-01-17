import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cai-dat-gia-phong',
  templateUrl: './dialog-cai-dat-gia-phong.component.html',
  styleUrls: ['./dialog-cai-dat-gia-phong.component.scss']
})
export class DialogCaiDatGiaPhongComponent implements OnInit {
  public titleDialog = "Đặt số phòng để bán";
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialog.closeAll();
  }


}
