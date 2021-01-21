import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-template-search-hoa-don",
  templateUrl: "./template-search-hoa-don.component.html",
  styleUrls: ["./template-search-hoa-don.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TemplateSearchHoaDonComponent implements OnInit {
  public startDate = new Date();
  @Output()
  public _onChangeSearch: EventEmitter<any> = new EventEmitter();
  public _detailSearch = {
    startDate: undefined,
    endDate: undefined,
    feedBack: undefined,
    status: undefined,
  };
  ngOnInit(): void {}
  public onDateChange(event, key) {
    this._detailSearch[key] = event.value;
    this._onChangeSearch.emit(this._detailSearch);
  }
  public onChange(event, key) {
    this._detailSearch[key] =
      event.target.value === "1"
        ? true
        : event.target.value === ""
        ? undefined
        : false;
    this._onChangeSearch.emit(this._detailSearch);
  }
}
