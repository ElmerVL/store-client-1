import {Component, OnInit} from '@angular/core';
import Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import {LoginService} from '../services/login.service';
import {SendMessage} from '../shared/send-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private serverUrl = 'http://localhost:9090/socket';
  private title = 'WebSockets chat';
  private stompClient;
  private counter: number;

  public userName: string;
  public userIcon: string;
  public message: SendMessage;
  public messages: SendMessage[];


  constructor(
    private loginService: LoginService
  ) {
    this.userName = '';
    this.userIcon = '';
    this.message = new SendMessage();
    this.messages = [];
    this.counter = 0;
    this.initializeWebSocketConnection();
  }

  ngOnInit() {
    this.initChat();
  }

  initChat() {
    this.loginService.getUserName().subscribe(value => {
      if (value) {
        this.userName = value;
      }
    });
    this.loginService.getUserIcon().subscribe(value => {
      if (value) {
        this.userIcon = value;
      }
    });
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, (frame) => {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          const array = message.body.split('|');
          this.message = this.buildMessage(array);
          this.messages[this.counter] = this.message;
          this.counter++;
        }
      });
    });
  }

  buildMessage(array: string[]): SendMessage {
    const aMessage = new SendMessage();
    aMessage.messageDate = array[0];
    aMessage.message = array[1];
    aMessage.userName = array[2];
    aMessage.userIcon = array[3];

    return aMessage;
  }

  sendMessage(message: string): void {
    const newMessage = message + '|' + this.userName + '|' + this.userIcon;
    this.stompClient.send('/app/send/message', {user: this.userName}, newMessage);
    $('#input').val('');
  }
}
