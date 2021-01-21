import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "dateData" })
export class DateDataPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      console.log(value);
      const date = new Date(value);
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    }
    return value;
  }
}
