import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService {
  private readonly BASE_URL: string = environment.serviceBaseUrl;

  constructor(private http: HttpClient) {}

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
        return this.http
          .get(URL)
          .pipe(catchError((error) => this._errorHandler(error)));
      case 'POST':
        return this.http
          .post(URL, body, { headers })
          .pipe(catchError((error) => this._errorHandler(error)));
      case 'PUT':
        return this.http
          .put(URL, body, { headers })
          .pipe(catchError((error) => this._errorHandler(error)));
      case 'DELETE':
        return this.http
          .delete(URL, { headers })
          .pipe(catchError((error) => this._errorHandler(error)));
    }
  }

  private _errorHandler(error: HttpErrorResponse) {
    const { status, message } = error;
    console.error(`Http Error => Status: ${status} , Message: ${message}`);
    return throwError(error);
  }
}

type HttpVerbs = 'GET' | 'POST' | 'PUT' | 'DELETE';
