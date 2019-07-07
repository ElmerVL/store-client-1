import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userName: string;
  public isLoginIn: boolean;

  constructor(
    public dialog: MatDialog,
    private loginService: LoginService
  ) {
    this.userName = '';
    this.isLoginIn = false;
  }

  ngOnInit() {
    this.initHeader();
  }

  initHeader() {
    this.loginService.getUserName().subscribe(value => {
      if (value) {
        this.userName = value;
      }
    });
  }

  openLoginForm() {
    this.isLoginIn = true;
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }

  closeLoginForm() {
    this.isLoginIn = false;
    this.loginService.setUserName('');
  }
}
