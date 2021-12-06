import { merge, Observable } from 'rxjs';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, mapTo } from 'rxjs/operators';
import { AuthService } from './auth/shared';
import { User } from './auth/shared/interfaces';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogService,
} from '@shared/confirmation-dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('confirmationDialog', { static: true })
  confirmationDialog: ConfirmationDialogComponent;

  isLoading$!: Observable<boolean>;
  private _showLoaderEvents$!: Observable<boolean>;
  private _hideLoaderEvents$!: Observable<boolean>;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private _confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this._confirmationDialogService.register(this.confirmationDialog);

    // Restore user information from localStorage
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token && user) this._authService.setCurrentUser = user;
    else this._router.navigate(['/login']);

    // Handle resolver loading status
    this._showLoaderEvents$ = this._router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      mapTo(true)
    );
    this._hideLoaderEvents$ = this._router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      mapTo(false)
    );
    this.isLoading$ = merge(this._hideLoaderEvents$, this._showLoaderEvents$);
  }
}
