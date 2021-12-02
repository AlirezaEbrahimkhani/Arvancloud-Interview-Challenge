// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// 3rd party
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

// app
import { SubscriptionManager } from '@app/core';
import { environment } from '@env/environment';
import { LoginModel, RegisterModel, User } from '../interfaces';

@Injectable()
export class UserService extends SubscriptionManager {
  private readonly _baseUrl: string = environment.serviceBaseUrl;
  private _currentUser = new BehaviorSubject<User>(null);

  public get user(): Observable<User> {
    return this._currentUser.asObservable();
  }

  constructor(
    private readonly _router: Router,
    private readonly _httpClient: HttpClient
  ) {
    super();
  }

  login(loginModel: LoginModel) {
    let loginSubscription: Subscription = this._httpClient
      .post<{ user: User }>(`${this._baseUrl}users/login`, loginModel)
      .subscribe(({ user }) => {
        this._currentUser.next(user);
        localStorage.setItem('token', user.token);
      });
    this.addSubscription$('login', loginSubscription);
  }

  register(registerModel: RegisterModel) {
    let registerSubscription: Subscription = this._httpClient
      .post(`${this._baseUrl}users`, registerModel)
      .subscribe(() => {
        this._router.navigate(['/login']);
      });
    this.addSubscription$('register', registerSubscription);
  }

  logout() {
    this._currentUser.next(null);
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
