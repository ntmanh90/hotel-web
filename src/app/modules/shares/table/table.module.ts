import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../_module/material-module";
import { BaseTableComponent } from "./base-table.component";
import { TableLanguageComponent } from "./table-language/table-language.component";
import { PipeModule } from "../pipe/pipe.module";
const CHILD = [BaseTableComponent, TableLanguageComponent];
@NgModule({
  imports: [CommonModule, MaterialModule, PipeModule],
  declarations: [...CHILD],
  exports: [...CHILD],
})
export class TableModule {}
