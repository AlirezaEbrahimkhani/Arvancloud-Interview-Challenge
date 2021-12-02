import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingComponent } from './auth-routing.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AuthRoutingComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
