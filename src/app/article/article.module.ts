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
import { ConfirmationDialogModule } from '@shared/confirmation-dialog';

@NgModule({
  declarations: [LayoutComponent, ArticleListComponent, ArticleFormComponent],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // article,
    ArticleRoutingModule,

    // shared
    ConfirmationDialogModule,
  ],
})
export class ArticleModule {}
