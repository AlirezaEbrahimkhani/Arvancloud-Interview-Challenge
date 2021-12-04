// angular

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// app

import { ArticleRoutingModule } from './article.routing';
import { ArticleRoutingComponent } from './article-routing.component';
import { ArticleService } from './shared';
import { LayoutComponent } from './components';

@NgModule({
  declarations: [ArticleRoutingComponent, LayoutComponent],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // article,
    ArticleRoutingModule,
  ],
  providers: [ArticleService],
})
export class ArticleModule {}
