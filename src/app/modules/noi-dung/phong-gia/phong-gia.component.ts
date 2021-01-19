import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isForOfStatement } from 'typescript';
import { CommonService } from '../_services/common.service';
import { DialogCaiDatGiaPhongComponent } from './dialog-cai-dat-gia-phong/dialog-cai-dat-gia-phong.component';
import { DialogDongMoPhongComponent } from './dialog-dong-mo-phong/dialog-dong-mo-phong.component';
interface tuan {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-phong-gia',
  templateUrl: './phong-gia.component.html',
  styleUrls: ['./phong-gia.component.scss']
})
export class PhongGiaComponent implements OnInit {
  tuans: tuan[] = [
    {value: '0', viewValue: '1 tuần'},
    {value: '1', viewValue: '1 tháng'},
    {value: '2', viewValue: '2 tháng'},
    {value: '3', viewValue: '3 tháng'}
  ];

  options: FormGroup;
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    fb: FormBuilder
  ) {
    this.options = fb.group({
    });
   }

  ngOnInit(): void {
  }




}
