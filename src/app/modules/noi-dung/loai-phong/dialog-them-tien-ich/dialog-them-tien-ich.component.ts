import { SelectionModel } from "@angular/cdk/collections";
import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { TienIchMask } from "../../_models/tien-ich-mask.model";
import { TienIch } from "../../_models/tien-ich.model";
import { CommonService } from "../../_services/common.service";

@Component({
  selector: "app-dialog-them-tien-ich",
  templateUrl: "./dialog-them-tien-ich.component.html",
  styleUrls: ["./dialog-them-tien-ich.component.scss"],
})
export class DialogThemTienIchComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public listTienIch: any;
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = [
    "select",
    "iD_TienIch",
    "tieuDe",
  ];
  selection = new SelectionModel<TienIch>(true, []);
  constructor(private tienIchService: CommonService,public modal: NgbActiveModal,) {};
  @Input() private listAddTienIch : TienIchMask[] = [];
  ngAfterViewInit(): void {}

  ngOnInit() {
    this.loadTienIch();
  }
  // Get Products list
  private loadTienIch() {
    var sb = this.tienIchService.get_All_TienIch().subscribe(
      (data: {}) => {
        this.listTienIch = new MatTableDataSource();
        this.listTienIch.data = data;
        this.listTienIch.paginator = this.paginator;
        this.listTienIch.sort = this.sort;
        console.log(this.listTienIch);
      },
      (error) => {
      }
    );
    this.subscriptions.push(sb);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listTienIch.data.length;
    return numSelected === numRows;
  }
   masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.listTienIch.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?: TienIch): string {
    if (this.listTienIch && this.listTienIch.data > 0) {
      if (!row) {
        return `${this.isAllSelected() ? "select" : "deselect"} all`;
      }
      return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
        row.tieuDe
      }`;
    }
  }
  onClickCheckbox(row?: TienIch){
    if(this.listAddTienIch.indexOf({id: row.iD_TienIch, name: row.tieuDe} as TienIchMask) === -1){
      this.listAddTienIch.push({id: row.iD_TienIch, name: row.tieuDe, check: true});
    }else{
      this.listAddTienIch.splice(this.listAddTienIch.indexOf({id: row.iD_TienIch, name: row.tieuDe} as TienIchMask), 1);
    }
  }
  saveDataAndCloseDialog(event){
    this.modal.close(this.listAddTienIch);
  }
}
