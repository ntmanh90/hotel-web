import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogMessageService {

  messages: string[];

  add(message: string): void {
    //this.messages.push(message);
    console.log(message);

  }
  clear() {
    //this.messages = [];
  }

  constructor() { }

}
