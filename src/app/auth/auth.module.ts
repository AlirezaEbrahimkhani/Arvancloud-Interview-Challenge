import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingComponent } from './auth-routing.component';
import { AuthRoutingModule } from './auth.routing';
import { UserService } from './shared';

@NgModule({
  declarations: [AuthRoutingComponent],
  imports: [
    // angular
    CommonModule,

    // auth
    AuthRoutingModule,
  ],
  providers: [UserService],
})
export class AuthModule {}
