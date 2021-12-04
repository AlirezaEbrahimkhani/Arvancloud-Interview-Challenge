import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Toaster } from '@shared/toast-notification';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService {
  private readonly BASE_URL: string = environment.serviceBaseUrl;

  constructor(
    private readonly _http: HttpClient,
    private readonly _toaster: Toaster
  ) {}

  public get$<R>(url: string): Observable<R> {
    return this._httpRequest(url, 'GET');
  }

  post$(url: string, body: Object) {
    return this._httpRequest(url, 'POST', body);
  }

  put$(url: string, body: Object) {
    return this._httpRequest(url, 'PUT', body);
  }

  delete$(url: string) {
    return this._httpRequest(url, 'DELETE');
  }

  private _getHttpHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Token ' + token,
    });
  }

  private _httpRequest(
    url: string,
    httpVerb: HttpVerbs,
    body?: Object
  ): Observable<any> {
    const URL = `${this.BASE_URL}${url}`;
    const headers = this._getHttpHeaders();
    switch (httpVerb) {
      case 'GET':
        return this._http
          .get(URL)
          .pipe(catchError((error) => this._errorHandler(error)));
      case 'POST':
        return this._http
          .post(URL, body, { headers })
          .pipe(catchError((error) => this._errorHandler(error)));
      case 'PUT':
        return this._http
          .put(URL, body, { headers })
          .pipe(catchError((error) => this._errorHandler(error)));
      case 'DELETE':
        return this._http
          .delete(URL, { headers })
          .pipe(catchError((error) => this._errorHandler(error)));
    }
  }

  private _errorHandler(error: HttpErrorResponse) {
    const { status, message } = error;
    this._toaster.open({
      type: 'danger',
      caption: `Status: ${status}`,
      text: `${message}`,
    });
    return throwError(error);
  }
}

type HttpVerbs = 'GET' | 'POST' | 'PUT' | 'DELETE';
