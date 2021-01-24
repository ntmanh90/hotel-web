import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-service',
  templateUrl: './collapse-service.component.html',
  styleUrls: ['./collapse-service.component.scss']
})
export class CollapseServiceComponent implements OnInit {
  public isCollapsed = false;
  constructor() { }

  ngOnInit(): void {
  }

}
