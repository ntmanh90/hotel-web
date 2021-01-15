import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../_module/material-module";
import { BaseUploadFileComponent } from "./base-upload-file/base-upload-file.component";
import { AvatarUploadFileComponent } from "./avatar-upload/avatar-upload.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { UploadTabComponent } from "./upload-tab/upload-tab.component";
import { ListImageTabComponent } from "./list-image-tab/list-image-tab.component";
import { TemplateModule } from "../template/template.module";
const CHILD = [BaseUploadFileComponent, AvatarUploadFileComponent, UploadTabComponent, ListImageTabComponent];
@NgModule({
  imports: [CommonModule, MaterialModule, NgbModalModule, TemplateModule],
  declarations: [...CHILD],
  exports: [...CHILD],
})
export class UploadFileModule {}
