import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article.routing';
import { ArticleRoutingComponent } from './article-routing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from './shared';

@NgModule({
  declarations: [ArticleRoutingComponent],
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
