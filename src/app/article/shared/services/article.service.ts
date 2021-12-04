import { Injectable } from '@angular/core';
import { HttpBaseService } from '@app/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _articleList$ = new BehaviorSubject<Article[]>([]);

  public get articles(): Observable<Article[]> {
    return this._articleList$.asObservable();
  }

  public set setArticles(articles: Article[]) {
    this._articleList$.next(articles);
  }

  constructor(private readonly _httpBase: HttpBaseService) {}

  getAllArticles(): Observable<Article[]> {
    return this._httpBase.get$('articles');
  }
}
