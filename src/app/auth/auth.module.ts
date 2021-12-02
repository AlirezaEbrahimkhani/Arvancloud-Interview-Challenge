import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingComponent } from './auth-routing.component';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  declarations: [AuthRoutingComponent],
  imports: [
    // angular
    CommonModule,

    // auth
    AuthRoutingModule,
  ],
})
export class AuthModule {}
