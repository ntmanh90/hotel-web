import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ColumnDef } from "../base-table.component";

@Component({
  selector: "app-table-language",
  templateUrl: "./table-language.component.html",
  styleUrls: ["./table-language.component.scss"],
})
export class TableLanguageComponent implements OnInit {
  @Input()
  public dataSource = new MatTableDataSource();
  @Input()
  public ListColumnDef: ColumnDef[] = [];
  @Input()
  public DisplayedColumns: string[] = [];
  @Output()
  public _changeData: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {}
  public changeData(event, row, field) {
    this._changeData.emit({ value: event, row: row, field: field });
  }
}
