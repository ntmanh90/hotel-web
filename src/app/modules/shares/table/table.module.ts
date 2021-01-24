import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../_module/material-module";
import { BaseTableComponent } from "./base-table.component";
import { TableLanguageComponent } from "./table-language/table-language.component";
import { PipeModule } from "../pipe/pipe.module";
import { TablePhanQuyenComponent } from "./table-phan-quyen/table-phan-quyen.component";
const CHILD = [BaseTableComponent, TableLanguageComponent, TablePhanQuyenComponent];
@NgModule({
  imports: [CommonModule, MaterialModule, PipeModule],
  declarations: [...CHILD],
  exports: [...CHILD],
})
export class TableModule {}
