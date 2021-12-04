import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components';

const ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
