import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-validation-data-component",
  template: ` <p>validation-data-component works!</p> `,
  styles: [],
})
export class ValidationComponent implements OnInit {
  constructor(formData: FormGroup) {
    this.formData = formData;
  }

  ngOnInit(): void {}
  private formData: FormGroup;

  isControlValid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    let valid = control.valid;
    return valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    let invalid = control.invalid;
    return invalid && (control.dirty || control.touched);
  }
  controlHasError(validation, controlName): boolean {
    const control = this.formData.controls[controlName];
    let isInvalid = control.hasError(validation);
    return (control.dirty || control.touched) && isInvalid;
  }
  validationDate(controlNameDateFrom, controlNameDateTo) {
    const formValue = this.formData.value;
    const dateFrom = new Date(formValue[controlNameDateFrom]);
    const dateTo = new Date(formValue[controlNameDateTo]);
    return dateFrom <= dateTo;
  }
}
