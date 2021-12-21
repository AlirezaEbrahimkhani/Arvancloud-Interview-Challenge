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
import {
  Article,
  CreateArticleDTO,
  SafeData,
  Tag,
} from '@app/article/shared/interfaces';
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
  tags: Tag[] = [];
  loading: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _toaster: Toaster,
    private readonly _router: Router,
    private readonly _articleService: ArticleService,
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
    if (tagName) this.tags.push({ name: tagName, value: true });
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
      ({ article }) => {
        let articleData = article[0].article;
        let tags = article[1];
        this._fillDataIntoForm(articleData, tags);
      }
    );
    this.addSubscription$('editArticleData', articleDataSubscription);
  }

  private _fillDataIntoForm(articleData, tags: string[]) {
    const { title, description, body } = articleData;
    this.tags = this._createEditTagList(articleData, tags);
    this.form.setValue({
      title,
      description,
      body,
    });
  }

  private _getTagList() {
    let tagListSubscription: Subscription = this._route.data.subscribe(
      ({ tags }) => {
        let mapResult = tags.map((tag) => {
          return { name: tag, value: false };
        });
        this.tags = this._sortTagListArray(mapResult);
      }
    );
    this.addSubscription$('tagList', tagListSubscription);
  }

  private _createEditTagList(article: Article, tags: string[]): Tag[] {
    let mapResult = tags.map((tag) => {
      return {
        name: tag,
        value: article.tagList.includes(tag),
      };
    });
    return this._sortTagListArray(mapResult);
  }

  private _extractSelectedTags(tagList: Tag[]): string[] {
    let result: string[] = [];
    tagList.forEach((tag) => {
      if (tag.value) result.push(tag.name);
    });
    return result;
  }

  private _sortTagListArray(tagList: Tag[]): Tag[] {
    return tagList.sort((a, b) => {
      let aName = a.name.toLowerCase(),
        bName = b.name.toLowerCase();
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    });
  }

  private _updateArticle(formValue: CreateArticleDTO) {
    this._loadingBarService.show();
    let body = { ...formValue, tagList: this._extractSelectedTags(this.tags) };
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
    let body = { ...formValue, tagList: this._extractSelectedTags(this.tags) };
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
