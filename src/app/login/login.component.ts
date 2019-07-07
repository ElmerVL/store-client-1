import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {remember: false, username: '', password: ''};

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    // llamada a login de back end
    console.log('User: ', this.user);
    this.loginService.setUserName(this.user.username);
    this.loginService.setUserIcon(this.getIconDefault(this.user.username));
    this.dialogRef.close();
  }

  getIconDefault(name: string): string {
    let icon = 'https://bootdey.com/img/Content/avatar/avatar1.png';
    if (name === 'Elmer') {
      icon = 'https://bootdey.com/img/Content/avatar/avatar6.png';
    }

    return icon;
  }
}
