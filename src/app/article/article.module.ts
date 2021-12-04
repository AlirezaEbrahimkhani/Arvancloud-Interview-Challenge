// angular

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// app

import { ArticleRoutingModule } from './article.routing';
import { ArticleService } from './shared';
import { ArticleListComponent, LayoutComponent } from './components';

@NgModule({
  declarations: [LayoutComponent, ArticleListComponent],
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
