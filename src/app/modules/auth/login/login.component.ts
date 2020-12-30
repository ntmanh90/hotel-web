import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '..';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  login() {
      this.spinner.show();
      this.authService.login();
    }
}
