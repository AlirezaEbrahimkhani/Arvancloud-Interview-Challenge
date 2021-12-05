import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '..';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ArticleEditResolver implements Resolve<Article> {
  constructor(private readonly _articleService: ArticleService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Article> {
    const { params } = route;
    return this._articleService.getArticleBySlug(params?.slug);
  }
}
