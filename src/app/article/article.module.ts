import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article.routing';
import { ArticleRoutingComponent } from './article-routing.component';
import { ToastNotificationsModule } from '@shared/toast-notification';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleRoutingComponent],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // shared
    ToastNotificationsModule,

    // article,
    ArticleRoutingModule,
  ],
})
export class ArticleModule {}
