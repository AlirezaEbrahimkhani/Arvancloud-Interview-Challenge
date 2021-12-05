// angular
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// app
import { ArticleService } from '@app/article/shared';
import { SubscriptionManager } from '@app/core';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogService,
} from '@shared/confirmation-dialog';
import { Toaster } from '@shared/toast-notification';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent
  extends SubscriptionManager
  implements OnInit
{
  @ViewChild('confirmationDialog', { static: true })
  confirmationDialog: ConfirmationDialogComponent;
  private _dropdown;

  constructor(
    public readonly articleService: ArticleService,
    private readonly _renderer: Renderer2,
    private readonly _toaster: Toaster,
    private _confirmationDialogService: ConfirmationDialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this._confirmationDialogService.register(this.confirmationDialog);
  }

  toggleDropdown(dropdown) {
    this._dropdown = dropdown;
    if (dropdown) {
      if (dropdown.classList.value.includes('show'))
        this._closeDropDown(dropdown);
      else this._openDropDown(dropdown);
    }
  }

  onDelete({ slug }) {
    this._confirmationDialogService.showDialog();
    let dialogResult: Subscription = this._confirmationDialogService.result
      .pipe(take(1))
      .subscribe((res: boolean) => {
        this._closeDropDown(this._dropdown);
        if (res) this._deleteArticle(slug);
      });
    this.addSubscription$('dialogResult', dialogResult);
  }

  private _closeDropDown(dropdown: any) {
    this._renderer.removeClass(dropdown, 'show');
  }

  private _openDropDown(dropdown: any) {
    this._renderer.addClass(dropdown, 'show');
  }

  private _deleteArticle(slug: string) {
    let deleteArticleSubscription: Subscription = this.articleService
      .deleteArticle(slug)
      .subscribe(() => this._deleteArticleResponseHandler());
    this.addSubscription$('deleteArticle', deleteArticleSubscription);
  }

  private _deleteArticleResponseHandler() {
    this._toaster.open({
      type: 'success',
      text: 'Article deleted successfully !',
    });
    this._reloadArticleTableData();
  }

  private _reloadArticleTableData() {
    this.articleService
      .getAllArticles()
      .subscribe((articles) => (this.articleService.setArticles = articles));
  }
}
