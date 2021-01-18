import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cai-dat-gia-phong',
  templateUrl: './dialog-cai-dat-gia-phong.component.html',
  styleUrls: ['./dialog-cai-dat-gia-phong.component.scss']
})
export class DialogCaiDatGiaPhongComponent implements OnInit {
  public titleDialog = "Đặt số phòng để bán";
  checked: boolean = false;
  value = 'Clear me';
  options: FormGroup;
  constructor(
    public dialog: MatDialog,
    fb: FormBuilder
  ) {
    this.options = fb.group({
    });
   }

  ngOnInit(): void {
  }

  onClose(){
    this.dialog.closeAll();
  }


}
