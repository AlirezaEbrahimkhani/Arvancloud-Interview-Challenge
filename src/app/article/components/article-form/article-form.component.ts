// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// app
import { ArticleService } from '@app/article/shared';
import { SubscriptionManager } from '@app/core';
import { Subscription } from 'rxjs';

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
    private readonly _articleService: ArticleService
  ) {
    super();
    this.form = this._formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      body: [null, Validators.required],
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

  private _getEditArticleData() {
    let articleDataSubscription: Subscription = this._route.data.subscribe(
      ({ article }) => this._fillDataIntoForm(article.article)
    );
    this.addSubscription$('editArticleData', articleDataSubscription);
  }

  private _fillDataIntoForm(articleData) {
    this.form.setValue({
      title: articleData.title,
      description: articleData.description,
      body: articleData.body,
    });
  }

  private _getTagList() {
    let tagListSubscription: Subscription = this._route.data.subscribe(
      ({ tags }) => (this.tags = tags)
    );
    this.addSubscription$('tagList', tagListSubscription);
  }

  onArticleSubmit() {}

  onSubmitTag() {
    const { tagName } = this.tagListForm.value;
    this.tags.push(tagName);
    this.tagListForm.reset();
  }
}
