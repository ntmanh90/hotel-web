import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationDataComponent } from './validation-data.component';



@NgModule({
  declarations: [ValidationDataComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ValidationDataComponent
  ]
})
export class ValidationModule { }
