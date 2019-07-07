import {Injectable} from '@angular/core';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userName: Subject<string> = new BehaviorSubject<string>('');
  private userIcon: Subject<string> = new BehaviorSubject<string>('');

  constructor() {
  }

  getUserName(): Observable<string> {
    return this.userName.asObservable();
  }

  setUserName(value: string): void {
    this.userName.next(value);
  }

  getUserIcon(): Observable<string> {
    return this.userIcon.asObservable();
  }

  setUserIcon(value: string): void {
    this.userIcon.next(value);
  }
}
