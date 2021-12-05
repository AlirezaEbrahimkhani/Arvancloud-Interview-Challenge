import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ArticleFormComponent,
  ArticleListComponent,
  LayoutComponent,
} from './components';
import {
  ArticleEditResolver,
  ArticlesResolver,
  TagListResolver,
} from './shared/resolvers';

const ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent,
        resolve: {
          articles: ArticlesResolver,
        },
      },
      {
        path: 'edit/:slug',
        component: ArticleFormComponent,
        resolve: {
          article: ArticleEditResolver,
        },
      },
      {
        path: 'create',
        component: ArticleFormComponent,
        resolve: {
          tags: TagListResolver,
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
