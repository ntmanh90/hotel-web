import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../_module/material-module";
import { BaseTableComponent } from "./base-table.component";
import { TableLanguageComponent } from "./table-language/table-language.component";
const CHILD = [BaseTableComponent, TableLanguageComponent];
@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [...CHILD],
  exports: [...CHILD],
})
export class TableModule {}
