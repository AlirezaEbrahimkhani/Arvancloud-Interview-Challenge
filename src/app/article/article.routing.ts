import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleResolver } from './shared/resolvers/articles.resolver';
import {
  ArticleFormComponent,
  ArticleListComponent,
  LayoutComponent,
} from './components';

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
      {
        path: 'edit/:slug',
        component: ArticleFormComponent,
      },
      {
        path: 'create',
        component: ArticleFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
