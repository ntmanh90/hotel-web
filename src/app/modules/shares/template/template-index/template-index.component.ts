import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template-index',
  templateUrl: './template-index.component.html',
  styleUrls: ['./template-index.component.scss'],
})
export class TemplateIndexComponent implements OnInit {
  @Input()
  public titleCard: string;
  @Output()
  public _openDialogChiTiet: EventEmitter<any> = new EventEmitter();
  @Output()
  public _deleteAllData: EventEmitter<any> = new EventEmitter();
  @Output()
  public _onChangeInputTimKiem: EventEmitter<any> = new EventEmitter();
  @Input()
  public isHiddenButtonDeleteAll = false;
  ngOnInit(): void {}
  constructor() {}
  openDialogChiTiet(event) {
    this._openDialogChiTiet.emit(event);
  }
  deleteAllData(event) {
    this._deleteAllData.emit(event);
  }
  onChangeInputTimKiem(event) {
    this._onChangeInputTimKiem.emit(event);
  }
}
