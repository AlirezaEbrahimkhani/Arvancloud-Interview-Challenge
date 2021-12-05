// angular
import { Injectable } from '@angular/core';
import { HttpBaseService } from '@app/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// app
import { Article, CreateArticleDTO } from '../interfaces';

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
    return this._httpBase
      .get$('articles')
      .pipe(map(({ articles }: any) => (this.setArticles = articles)));
  }

  getArticleBySlug(slugName: string): Observable<Article> {
    return this._httpBase.get$(`articles/${slugName}`);
  }

  getTagList() {
    return this._httpBase.get$('tags').pipe(map(({ tags }) => tags));
  }

  createArticle(body: CreateArticleDTO) {
    return this._httpBase.post$('articles', { article: body });
  }

  updateArticle(slug: string, body: CreateArticleDTO) {
    return this._httpBase.put$(`articles/${slug}`, { article: body });
  }

  deleteArticle(slug: string) {
    return this._httpBase.delete$(`articles/${slug}`);
  }
}
