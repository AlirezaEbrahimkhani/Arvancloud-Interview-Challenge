import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent, LayoutComponent } from './components';
import { ArticleResolver } from './shared/resolvers/articles.resolver';

const ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent,
        resolve: {
          articles: ArticleResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
