import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-template-dialog",
  templateUrl: "./template-dialog.component.html",
  styleUrls: ["./template-dialog.component.scss"],
})
export class TemplateDialogComponent implements OnInit {
  @Input()
  public titleDialog: string;
  @Input()
  public isDisabledSaveButton: boolean = false;
  @Output()
  public _closeDialogNotSaveData: EventEmitter<any> = new EventEmitter();
  @Output()
  public _closeDialogSaveData: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}
  constructor() {}
  public closeDialogNotSaveData(event){
    this._closeDialogNotSaveData.emit(event);
  }
  public closeDialogSaveData(event){
    this._closeDialogSaveData.emit(event);
  }
}
