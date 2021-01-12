import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../_module/material-module';
import { BaseTableComponent } from './base-table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
      BaseTableComponent
  ],
  exports:[
    BaseTableComponent
  ]
})
export class TableModule { }
