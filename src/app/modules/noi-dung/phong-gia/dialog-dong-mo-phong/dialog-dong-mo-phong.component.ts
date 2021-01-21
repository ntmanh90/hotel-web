import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-dong-mo-phong',
  templateUrl: './dialog-dong-mo-phong.component.html',
  styleUrls: ['./dialog-dong-mo-phong.component.scss']
})
export class DialogDongMoPhongComponent implements OnInit {
  labelPosition: 'on' | 'off' = 'off';
  options: FormGroup;
  constructor(public dialog: MatDialog, fb: FormBuilder) {
    this.options = fb.group({
    });
   }

  ngOnInit(): void {
  }

  onClose(){
    this.dialog.closeAll();
  }

}
