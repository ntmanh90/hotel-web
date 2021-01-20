import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../_module/material-module";
import { TemplateIndexComponent } from "./template-index/template-index.component";
import { TemplateDialogComponent } from "./template-dialog/template-dialog.component";
import { TemplateDetailIndexComponent } from "./template-detail-index/template-detail-index.component";
import { TemplateSearchHoaDonComponent } from "./template-search-hoa-don/template-search-hoa-don.component";
const CHILD = [
  TemplateIndexComponent,
  TemplateDialogComponent,
  TemplateDetailIndexComponent,
  TemplateSearchHoaDonComponent,
];
@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [...CHILD],
  entryComponents: [...CHILD],
  exports: [...CHILD],
})
export class TemplateModule {}
