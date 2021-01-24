import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.scss']
})
export class SearchRoomComponent implements OnInit {
  checkIn = new Date();
  bsInlineRangeValue: Date[];
  CheckOut = new Date();
 
  constructor() {
    this.onclickDatapicker();
  }
  onclickDatapicker(){
    this.CheckOut.setDate(this.checkIn.getDate() + 3);
    this.bsInlineRangeValue = [this.checkIn, this.CheckOut];
  }

  ngOnInit(): void {
  }

}
