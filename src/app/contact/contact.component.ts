import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactType, Message} from '../shared/message';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  message: Message;
  contactType = ContactType;
  public userName: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.userName = '';
    this.createForm();
  }

  ngOnInit() {
    this.loginService.getUserName().subscribe(value => {
      if (value) {
        this.userName = value;
      }
    });
  }

  createForm() {
    this.messageForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: ['', Validators.required],
      email: ['', Validators.required],
      agree: false,
      contacttype: 'Chat',
      text: ''
    });
  }

  onSubmit() {
    this.message = this.messageForm.value;
    console.log(this.message);
    this.messageForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    // work around
    const form: HTMLFormElement = document.getElementById('form') as HTMLFormElement;
    form.reset();
  }

}
