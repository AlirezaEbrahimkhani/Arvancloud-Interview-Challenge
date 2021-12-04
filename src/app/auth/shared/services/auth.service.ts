// angular
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// 3rd party
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subscription,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

// app
import { SubscriptionManager } from '@app/core';
import { environment } from '@env/environment';
import { LoginModel, RegisterModel, User } from '../interfaces';
import { Toaster } from '@shared/toast-notification';

@Injectable()
export class AuthService extends SubscriptionManager {
  private readonly _baseUrl: string = environment.serviceBaseUrl;
  private _currentUser = new BehaviorSubject<User>(null);

  public get user(): Observable<User> {
    return this._currentUser.asObservable();
  }

  constructor(
    private readonly _router: Router,
    private readonly _httpClient: HttpClient,
    private readonly _toaster: Toaster
  ) {
    super();
  }

  public login(loginModel: LoginModel) {
    let loginSubscription: Subscription = this._httpClient
      .post<{ user: User }>(`${this._baseUrl}users/login`, { user: loginModel })
      .pipe(catchError(this._handleLoginError))
      .subscribe(({ user }) => {
        this._currentUser.next(user);
        localStorage.setItem('token', user.token);
        this._router.navigate(['/articles']);
      });
    this.addSubscription$('login', loginSubscription);
  }

  public register(registerModel: RegisterModel) {
    let registerSubscription: Subscription = this._httpClient
      .post(`${this._baseUrl}users`, { user: registerModel })
      .pipe(catchError(this._handleRegistrationError))
      .subscribe(() => {
        this._router.navigate(['/login']);
      });
    this.addSubscription$('register', registerSubscription);
  }

  public logout() {
    this._currentUser.next(null);
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  private _handleLoginError(error: HttpErrorResponse) {
    if (error) {
      this._toaster.open({
        type: 'danger',
        caption: 'Login failed',
        text: 'Username and/or Password is invalid!',
      });
    }
    return EMPTY;
  }

  private _handleRegistrationError(error: HttpErrorResponse) {
    if (error) {
      this._toaster.open({
        type: 'danger',
        text: 'Registration Failed !',
      });
    }
    return EMPTY;
  }
}
