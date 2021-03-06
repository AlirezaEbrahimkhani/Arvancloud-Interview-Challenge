// angular
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// 3rd party
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

// app
import { SubscriptionManager } from '@app/core';
import { environment } from '@env/environment';
import { LoginModel, RegisterModel, User } from '../interfaces';
import { Toaster } from '@shared/toast-notification';
import { LoadingBarService } from '@app/core/modules';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends SubscriptionManager {
  private readonly _baseUrl: string = environment.serviceBaseUrl;
  private _currentUser$ = new BehaviorSubject<User>(null);
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public get user(): Observable<User> {
    return this._currentUser$.asObservable();
  }

  public set setCurrentUser(user: User) {
    this._currentUser$.next(user);
  }

  public get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  public set setUserLoggedIn(status: boolean) {
    this._isLoggedIn$.next(status);
  }

  constructor(
    private readonly _router: Router,
    private readonly _httpClient: HttpClient,
    private readonly _toaster: Toaster,
    private readonly _loadingBarService: LoadingBarService
  ) {
    super();
  }

  public login(loginModel: LoginModel) {
    this._loadingBarService.show();
    let loginSubscription: Subscription = this._httpClient
      .post<{ user: User }>(`${this._baseUrl}users/login`, { user: loginModel })
      .pipe(catchError((error) => this._handleLoginError(error)))
      .subscribe(({ user }) => this._handleLoginActions(user));
    this.addSubscription$('login', loginSubscription);
  }

  public register(registerModel: RegisterModel) {
    this._loadingBarService.show();
    let registerSubscription: Subscription = this._httpClient
      .post(`${this._baseUrl}users`, { user: registerModel })
      .pipe(catchError((error) => this._handleRegistrationError(error)))
      .subscribe(() => this._handleRegisterActions());
    this.addSubscription$('register', registerSubscription);
  }

  public logout() {
    this.setCurrentUser = null;
    this.setUserLoggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  private _handleRegisterActions() {
    this._loadingBarService.hide();
    this._toaster.open({
      type: 'success',
      caption: 'Well done!',
      text: 'Registration successful !',
    });
    this._router.navigate(['/login']);
  }

  private _handleLoginActions(user: User) {
    this._loadingBarService.hide();
    this.setCurrentUser = user;
    this.setUserLoggedIn = true;
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    this._router.navigate(['/articles']);
  }

  private _handleLoginError(error: HttpErrorResponse) {
    this._loadingBarService.hide();
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
    this._loadingBarService.hide();
    if (error) {
      this._toaster.open({
        type: 'danger',
        text: 'Registration Failed !',
      });
    }
    return EMPTY;
  }
}
