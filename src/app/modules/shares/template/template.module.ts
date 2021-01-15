import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../_module/material-module";
import { TemplateIndexComponent } from "./template-index/template-index.component";
import { TemplateDialogComponent } from "./template-dialog/template-dialog.component";
const CHILD = [TemplateIndexComponent, TemplateDialogComponent];
@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [...CHILD],
  entryComponents:[...CHILD],
  exports: [...CHILD],
})
export class TemplateModule {}
