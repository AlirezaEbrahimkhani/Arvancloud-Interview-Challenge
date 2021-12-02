// angular

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/auth/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _userService: UserService
  ) {
    this.form = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) this._userService.login(this.form.value);
  }
}
