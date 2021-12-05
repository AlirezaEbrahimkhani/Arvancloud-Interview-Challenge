import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '..';

@Injectable({
  providedIn: 'root',
})
export class TagListResolver implements Resolve<string[]> {
  constructor(private readonly _articleService: ArticleService) {}

  resolve(): Observable<string[]> {
    return this._articleService.getTagList();
  }
}
