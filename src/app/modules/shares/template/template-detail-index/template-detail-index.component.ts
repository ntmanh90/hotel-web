import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template-detail-index',
  templateUrl: './template-detail-index.component.html',
  styleUrls: ['./template-detail-index.component.scss'],
})
export class TemplateDetailIndexComponent implements OnInit {
  @Input()  
  public titleCard: string;
    ngOnInit(): void {
    }
}