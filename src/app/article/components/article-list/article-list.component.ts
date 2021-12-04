import { Component, Renderer2 } from '@angular/core';
import { ArticleService } from '@app/article/shared';
import { Article } from '@app/article/shared/interfaces';
import { Toaster } from '@shared/toast-notification';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  constructor(
    public readonly articleService: ArticleService,
    private readonly _renderer: Renderer2,
    private readonly _toaster: Toaster
  ) {}

  toggleDropdown(dropdown) {
    if (dropdown) {
      if (dropdown.classList.value.includes('show')) {
        this._renderer.removeClass(dropdown, 'show');
      } else {
        this._renderer.addClass(dropdown, 'show');
      }
    }
  }

  onDelete(article: Article) {}
}
