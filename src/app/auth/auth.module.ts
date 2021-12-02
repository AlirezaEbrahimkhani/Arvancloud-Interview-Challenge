import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingComponent } from './auth-routing.component';
import { AuthRoutingModule } from './auth.routing';
import { LoginComponent, RegisterComponent } from './components';
import { UserService } from './shared';

@NgModule({
  declarations: [AuthRoutingComponent, LoginComponent, RegisterComponent],
  imports: [
    // angular
    CommonModule,

    // auth
    AuthRoutingModule,
  ],
  providers: [UserService],
})
export class AuthModule {}
