import { Component } from '@angular/core';
import { AuthService } from '@app/auth/shared';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(public readonly authService: AuthService) {}
}
