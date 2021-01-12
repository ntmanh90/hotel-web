import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-data-component',
  template: `
    <p>
      validation-data-component works!
    </p>
  `,
  styles: [
  ]
})
export class ValidationDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public formData: FormGroup;

  isControlValid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    let valid = control.valid;
    if (controlName === "chonguong" && control.value === -1) {
      valid = false;
    }
    return valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.formData.controls[controlName];
    let invalid = control.invalid;
    if (controlName === "chonguong" && control.value === -1) {
      invalid = true;
    }
    return invalid && (control.dirty || control.touched);
  }
  controlHasError(validation, controlName): boolean {
    const control = this.formData.controls[controlName];
    let isInvalid = control.hasError(validation);
    if (controlName === "chonguong" && control.value === -1) {
      isInvalid = true;
    }
    return (control.dirty || control.touched) && isInvalid;
  }
  controlHasErrorNumberic(
    validation,
    controlName,
    maxiumValue,
    minumValue
  ): boolean {
    const control = this.formData.controls[controlName];
    let isInvalid = control.hasError(validation);
    if (control.value > maxiumValue || control.value < minumValue) {
      isInvalid = true;
    }
    return (control.dirty || control.touched) && isInvalid;
  }
  isControlValidNumberic(
    controlName: string,
    maxiumValue,
    minumValue
  ): boolean {
    const control = this.formData.controls[controlName];
    let valid = control.valid;
    if (control.value > maxiumValue || control.value < minumValue) {
      valid = false;
    }
    return valid && (control.dirty || control.touched);
  }
  isControlInvalidNumberic(
    controlName: string,
    maxiumValue,
    minumValue
  ): boolean {
    const control = this.formData.controls[controlName];
    let invalid = control.invalid;
    if (control.value > maxiumValue || control.value < minumValue) {
      invalid = true;
    }
    return invalid && (control.dirty || control.touched);
  }
}
