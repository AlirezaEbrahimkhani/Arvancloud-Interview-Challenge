import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ArticleService } from '..';

@Injectable({
  providedIn: 'root',
})
export class ArticleEditResolver implements Resolve<any> {
  constructor(private readonly _articleService: ArticleService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const { params } = route;
    return forkJoin([
      this._articleService.getArticleBySlug(params?.slug),
      this._articleService.getTagList(),
    ]);
  }
}
