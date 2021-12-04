import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ArticleService } from '@app/article/shared';
import { Article } from '@app/article/shared/interfaces';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogService,
} from '@shared/confirmation-dialog';
import { Toaster } from '@shared/toast-notification';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  @ViewChild('confirmationDialog', { static: true })
  confirmationDialog: ConfirmationDialogComponent;
  private _dropdown;

  constructor(
    public readonly articleService: ArticleService,
    private readonly _renderer: Renderer2,
    private readonly _toaster: Toaster,
    private _confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this._confirmationDialogService.register(this.confirmationDialog);
  }

  toggleDropdown(dropdown) {
    this._dropdown = dropdown;
    if (dropdown) {
      if (dropdown.classList.value.includes('show')) {
        this._renderer.removeClass(dropdown, 'show');
      } else {
        this._renderer.addClass(dropdown, 'show');
      }
    }
  }

  onDelete(article: Article) {
    this._confirmationDialogService.showDialog();
    this._confirmationDialogService.result
      .pipe(take(1))
      .subscribe((res: boolean) => {
        this._renderer.removeClass(this._dropdown, 'show');
        console.log(res);
      });
  }
}
