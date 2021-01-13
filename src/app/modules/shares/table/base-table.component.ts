import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface ColumnDef {
  id?: number;
  field: string;
  title?: string;
}
@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent implements OnInit {
  @Input() public dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  @Input() public ListColumnDef: ColumnDef[] = [];
  @Input() public DisplayedColumns: string[] = [];
  constructor() {}
  ngOnInit() {}
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (this.dataSource.data.length > 0) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${
        this.selection.isSelected(row) ? 'deselect' : 'select'
      } row ${row}`;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}
