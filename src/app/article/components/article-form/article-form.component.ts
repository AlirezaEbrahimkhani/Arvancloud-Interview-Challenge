// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';

// app
import { ArticleService } from '@app/article/shared';
import { CreateArticleDTO } from '@app/article/shared/interfaces';
import { SubscriptionManager } from '@app/core';
import { Toaster } from '@shared/toast-notification';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent
  extends SubscriptionManager
  implements OnInit
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
    private readonly _router: Router
  ) {
    super();
    this.form = this._formBuilder.group({
      title: [null, Validators.required],
      description: [null],
      body: [null],
    });

    this.tagListForm = this._formBuilder.group({
      tagName: [null],
    });
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
    let body = { ...formValue, tagList: this.tags };
    const slug = this._route.snapshot.paramMap.get('slug');
    this._articleService
      .updateArticle(slug, body)
      .pipe(
        catchError((error) => {
          this._toaster.open({
            type: 'danger',
            caption: 'Error ...',
            text: 'An error occurred while updating article !',
          });
          return throwError(error);
        })
      )
      .subscribe((response) => {
        if (response) {
          this._toaster.open({
            type: 'success',
            caption: 'Well done!',
            text: 'Article updated successfully !',
          });
          this._router.navigate(['/articles']);
        }
      });
  }

  private _createArticle(formValue: CreateArticleDTO) {
    let body = { ...formValue, tagList: this.tags };
    this._articleService
      .createArticle(body)
      .pipe(
        catchError((error) => {
          this._toaster.open({
            type: 'danger',
            caption: 'Error ...',
            text: 'An error occurred while creating article !',
          });
          return throwError(error);
        })
      )
      .subscribe((response) => {
        if (response) {
          this._toaster.open({
            type: 'success',
            caption: 'Well done!',
            text: 'Article created successfully !',
          });
          this._router.navigate(['/articles']);
        }
      });
  }
}
