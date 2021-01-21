import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-element-loai-guong-table",
  templateUrl: "./element-loai-guong-table.component.html",
  styleUrls: ["./element-loai-guong-table.component.scss"],
})
export class ElementLoaiGuongTableComponent implements OnInit {
  @Input()
  public listLoaiGuong = [];
  @Output()
  public _openDialogAddNewTypeRoom: EventEmitter<any> = new EventEmitter();
  @Output()
  public _clickRemoveButton: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  public openDialogAddNewTypeRoom(event) {
    this._openDialogAddNewTypeRoom.emit(event);
  }
  public onClickRemove(event, index) {
    this.listLoaiGuong.splice(index, 1);
    this._clickRemoveButton.emit({ row: event, index: index });
  }
}
