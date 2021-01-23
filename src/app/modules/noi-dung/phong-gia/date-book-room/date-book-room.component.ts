import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhongGiaViewTable } from '../../_models/phong-gia.model';

@Component({
  selector: 'app-date-book-room',
  templateUrl: './date-book-room.component.html',
  styleUrls: ['./date-book-room.component.scss']
})
export class DateBookRoomComponent implements OnInit {
  isChecked = true;
  @Input()
  public listPhongGia: PhongGiaViewTable[];
  @Output()
  public updateData: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  public onChangeData(element, keyString){
    this.updateData.emit({
      element: element,
      keyString: keyString
    })
  }
}
