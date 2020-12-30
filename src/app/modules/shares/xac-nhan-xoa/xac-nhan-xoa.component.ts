import { Component, Input, OnInit } from '@angular/core';
import{NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-xac-nhan-xoa',
  templateUrl: './xac-nhan-xoa.component.html',
  styleUrls: ['./xac-nhan-xoa.component.scss']
})
export class XacNhanXoaComponent implements OnInit {
  @Input() tieuDe: string;
  
  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
  }


}
