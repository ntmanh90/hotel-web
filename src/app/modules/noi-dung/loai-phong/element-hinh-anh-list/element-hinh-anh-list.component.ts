import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-element-hinh-anh-list",
  templateUrl: "./element-hinh-anh-list.component.html",
  styleUrls: ["./element-hinh-anh-list.component.scss"],
})
export class ElementHinhAnhListComponent implements OnInit {
  @Input()
  public listImage = [];
  @Output()
  public _openDialogImage: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  public openDialogImage(event) {
    this._openDialogImage.emit(event);
  }
}
