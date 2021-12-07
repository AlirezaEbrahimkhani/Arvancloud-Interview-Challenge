import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _AuthService: AuthService
  ) {
    this._initForm();
  }

  private _initForm() {
    this.form = this._formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) this._AuthService.register(this.form.value);
  }
}
