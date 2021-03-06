import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleService } from '..';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ArticlesResolver implements Resolve<Article[]> {
  constructor(private readonly _articleService: ArticleService) {}

  resolve(): Observable<Article[]> {
    return this._articleService.getAllArticles();
  }
}
