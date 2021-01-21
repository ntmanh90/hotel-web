import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-element-tien-ich-check-list",
  templateUrl: "./element-tien-ich-check-list.component.html",
  styleUrls: ["./element-tien-ich-check-list.component.scss"],
})
export class ElementTienIchCheckListComponent implements OnInit {
  @Input()
  public listTienIch = [];
  @Output()
  public _OpenDialogThemTienIch: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  public OpenDialogThemTienIch(event) {
    this._OpenDialogThemTienIch.emit(event);
  }
}
