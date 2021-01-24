import { SelectionModel } from "@angular/cdk/collections";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
export interface ColumnDef {
  id?: number;
  field: string;
  title?: string;
  type?: number;
}
export const ENUM_THAO_TAC = {
  SELECT: 0,
  ADD: 1,
  UPDATE: 2,
  DELETE: 3,
};
@Component({
  selector: "app-table-phan-quyen",
  templateUrl: "./table-phan-quyen.component.html",
  styleUrls: ["./table-phan-quyen.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TablePhanQuyenComponent implements OnInit {
  @Input() public dataSource = new MatTableDataSource();
  public selection = new SelectionModel<any>(true, []);
  public selectionThem = new SelectionModel<any>(true, []);
  public selectionSua = new SelectionModel<any>(true, []);
  public selectionXoa = new SelectionModel<any>(true, []);
  @Input() public ListColumnDef: ColumnDef[] = [];
  @Input() public DisplayedColumns: string[] = [];
  ngOnInit(): void {}
  public checkboxLabel(row: any, thaoTac): string {
    if (this.dataSource.data.length > 0) {
      this.isMoreSelect(thaoTac);
      if (!row) {
        return `${this.isAllSelected(thaoTac) ? "select" : "deselect"} all`;
      }
      switch (thaoTac) {
        case ENUM_THAO_TAC.SELECT:
          return `${
            this.selection.isSelected(row) ? "deselect" : "select"
          } row ${row}`;
        case ENUM_THAO_TAC.ADD:
          return `${
            this.selectionThem.isSelected(row) ? "deselect" : "select"
          } row ${row}`;
        case ENUM_THAO_TAC.UPDATE:
          return `${
            this.selectionSua.isSelected(row) ? "deselect" : "select"
          } row ${row}`;
        case ENUM_THAO_TAC.DELETE:
          return `${
            this.selectionXoa.isSelected(row) ? "deselect" : "select"
          } row ${row}`;
      }
      return `${
        this.selection.isSelected(row) ? "deselect" : "select"
      } row ${row}`;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(thaoTac) {
    let numSelected = this.selection.selected.length;
    switch (thaoTac) {
      case ENUM_THAO_TAC.ADD:
        numSelected = this.selectionThem.selected.length;
        break;
      case ENUM_THAO_TAC.UPDATE:
        numSelected = this.selectionSua.selected.length;
        break;
      case ENUM_THAO_TAC.DELETE:
        numSelected = this.selectionXoa.selected.length;
        break;
    }
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  isMoreSelect(thaoTac) {
    let isMoreSelect = this.selection.selected.length > 1;
    switch (thaoTac) {
      case ENUM_THAO_TAC.ADD:
        isMoreSelect = this.selectionThem.selected.length > 1;
        break;
      case ENUM_THAO_TAC.UPDATE:
        isMoreSelect = this.selectionSua.selected.length > 1;
        break;
      case ENUM_THAO_TAC.DELETE:
        isMoreSelect = this.selectionXoa.selected.length > 1;
        break;
    }
    // this._isSelectData.emit(isMoreSelect);
    // this._selectData.emit(this.selection.selected);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(thaoTac) {
    switch (thaoTac) {
      case ENUM_THAO_TAC.SELECT:
        this.isAllSelected(thaoTac)
          ? this.selection.clear()
          : this.dataSource.data.forEach((row) => this.selection.select(row));
        break;
      case ENUM_THAO_TAC.ADD:
        this.isAllSelected(thaoTac)
          ? this.selectionThem.clear()
          : this.dataSource.data.forEach((row) => this.selectionThem.select(row));
        break;
      case ENUM_THAO_TAC.UPDATE:
        this.isAllSelected(thaoTac)
          ? this.selectionSua.clear()
          : this.dataSource.data.forEach((row) => this.selectionSua.select(row));
        break;
      case ENUM_THAO_TAC.DELETE:
        this.isAllSelected(thaoTac)
          ? this.selectionXoa.clear()
          : this.dataSource.data.forEach((row) => this.selectionXoa.select(row));
        break;
    }
  }
}
