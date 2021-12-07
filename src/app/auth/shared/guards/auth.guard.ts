import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthService) {}
  canActivate() {
    return this._authService.isLoggedIn.pipe(
      tap((status) => (!status ? this._authService.logout() : null))
    );
  }
}
