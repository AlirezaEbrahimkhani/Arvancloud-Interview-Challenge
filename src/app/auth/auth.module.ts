// angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// app
import { AuthRoutingComponent } from './auth-routing.component';
import { AuthRoutingModule } from './auth.routing';
import { LoginComponent, RegisterComponent } from './components';
import { AuthService } from './shared';

@NgModule({
  declarations: [AuthRoutingComponent, LoginComponent, RegisterComponent],
  imports: [
    // angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // auth
    AuthRoutingModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
