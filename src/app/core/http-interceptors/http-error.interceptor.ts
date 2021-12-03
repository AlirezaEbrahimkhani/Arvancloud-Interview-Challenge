import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/** Passes HttpErrorResponse to application-wide error handler */

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!window.navigator.onLine) {
      console.error(
        `Error: Internet connection failed.Please check your internet connection ... !`
      );
      return EMPTY;
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const { status } = err;
        if (err instanceof HttpErrorResponse && status === 0) {
          console.error(
            `Error => Status: ${status} , Message: Server connection error!`
          );
        }

        if (err instanceof HttpErrorResponse && status === 404) {
          console.error(
            `Error => Status: ${status} , Message: Cannot find service!`
          );
        }

        if (err instanceof HttpErrorResponse && status === 401) {
          console.error(
            `Error => Status: ${status} , Message: Permission denied!`
          );
        }

        console.error(
          `Error => Status: ${status} , Message: Error while connecting to service!`
        );

        return throwError(err);
      })
    );
  }
}
