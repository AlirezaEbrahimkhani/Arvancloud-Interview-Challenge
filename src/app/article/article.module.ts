// angular

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// app

import { ArticleRoutingModule } from './article.routing';
import {
  ArticleFormComponent,
  ArticleListComponent,
  LayoutComponent,
} from './components';

@NgModule({
  declarations: [LayoutComponent, ArticleListComponent, ArticleFormComponent],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // article,
    ArticleRoutingModule,
  ],
})
export class ArticleModule {}
