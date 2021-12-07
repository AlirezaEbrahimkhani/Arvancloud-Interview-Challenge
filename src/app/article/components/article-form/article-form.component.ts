// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// 3'rd party
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// app
import { ArticleService } from '@app/article/shared';
import { CreateArticleDTO, SafeData } from '@app/article/shared/interfaces';
import { SubscriptionManager } from '@app/core';
import { Toaster } from '@shared/toast-notification';
import { LoadingBarService } from '@app/core/modules';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent
  extends SubscriptionManager
  implements OnInit, SafeData
{
  form: FormGroup;
  tagListForm: FormGroup;
  tags: string[] = [];
  loading: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _articleService: ArticleService,
    private readonly _toaster: Toaster,
    private readonly _router: Router,
    private readonly _loadingBarService: LoadingBarService
  ) {
    super();
    this._initForms();
  }

  ngOnInit(): void {
    this._articleService.getTagList();
    this.isEditMode = this._route.snapshot.url[0].path === 'edit';
    if (this.isEditMode) this._getEditArticleData();
    else this._getTagList();
  }

  onArticleSubmit() {
    if (this.isEditMode) this._updateArticle(this.form.value);
    else this._createArticle(this.form.value);
  }

  onSubmitTag() {
    const { tagName } = this.tagListForm.value;
    if (tagName) this.tags.push(tagName);
    this.tagListForm.reset();
  }

  isDataSaved(): boolean {
    return this.form.dirty;
  }

  private _initForms() {
    this.form = this._formBuilder.group({
      title: [null, Validators.required],
      description: [null],
      body: [null],
    });

    this.tagListForm = this._formBuilder.group({
      tagName: [null],
    });
  }

  private _getEditArticleData() {
    let articleDataSubscription: Subscription = this._route.data.subscribe(
      ({ article }) => this._fillDataIntoForm(article.article)
    );
    this.addSubscription$('editArticleData', articleDataSubscription);
  }

  private _fillDataIntoForm(articleData) {
    const { title, description, body, tagList } = articleData;
    this.tags = tagList.sort() ?? [];
    this.form.setValue({
      title,
      description,
      body,
    });
  }

  private _getTagList() {
    let tagListSubscription: Subscription = this._route.data.subscribe(
      ({ tags }) => (this.tags = tags.sort())
    );
    this.addSubscription$('tagList', tagListSubscription);
  }

  private _updateArticle(formValue: CreateArticleDTO) {
    this._loadingBarService.show();
    let body = { ...formValue, tagList: this.tags };
    const slug = this._route.snapshot.paramMap.get('slug');
    this._articleService
      .updateArticle(slug, body)
      .pipe(catchError((error) => this._handleUpdateArticleError(error)))
      .subscribe((response) => {
        if (response) this._handleUpdateArticleAction();
      });
  }

  private _createArticle(formValue: CreateArticleDTO) {
    this._loadingBarService.show();
    let body = { ...formValue, tagList: this.tags };
    this._articleService
      .createArticle(body)
      .pipe(catchError((error) => this._handleCreateArticleError(error)))
      .subscribe((response) => {
        if (response) this._handleCreateArticleAction();
      });
  }

  private _handleCreateArticleAction() {
    this.form.reset();
    this._loadingBarService.hide();
    this._toaster.open({
      type: 'success',
      caption: 'Well done!',
      text: 'Article created successfully !',
    });
    this._router.navigate(['/articles']);
  }

  private _handleUpdateArticleAction() {
    this._loadingBarService.hide();
    this.form.reset();
    this._toaster.open({
      type: 'success',
      caption: 'Well done!',
      text: 'Article updated successfully !',
    });
    this._router.navigate(['/articles']);
  }

  private _handleUpdateArticleError(error: HttpErrorResponse) {
    this._toaster.open({
      type: 'danger',
      caption: 'Error ...',
      text: 'An error occurred while updating article !',
    });
    this._loadingBarService.hide();
    return throwError(error);
  }

  private _handleCreateArticleError(error: HttpErrorResponse) {
    this._toaster.open({
      type: 'danger',
      caption: 'Error ...',
      text: 'An error occurred while creating article !',
    });
    this._loadingBarService.hide();
    return throwError(error);
  }
}
