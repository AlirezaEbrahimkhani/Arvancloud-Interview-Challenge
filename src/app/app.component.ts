// angular
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

// app
import { User } from '@auth/shared/interfaces';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogService,
} from '@shared/confirmation-dialog';
import { LoadingBarService } from '@core/modules';
import { AuthService } from '@auth/shared';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('confirmationDialog', { static: true })
  confirmationDialog: ConfirmationDialogComponent;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private _confirmationDialogService: ConfirmationDialogService,
    private readonly _loadingBarService: LoadingBarService
  ) {}

  ngOnInit(): void {
    this._confirmationDialogService.register(this.confirmationDialog);

    // Restore user information from localStorage
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      this._authService.setCurrentUser = user;
      this._authService.setUserLoggedIn = true;
    } else {
      this._authService.logout();
      this._router.navigate(['/login']);
    }

    // Handle resolver loading status
    this._router.events.subscribe((event) => {
      if (event instanceof ResolveStart) this._loadingBarService.show();
      if (event instanceof ResolveEnd) this._loadingBarService.hide();
    });
  }
}
