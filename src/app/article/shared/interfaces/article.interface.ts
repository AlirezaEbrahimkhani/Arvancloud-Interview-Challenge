import { ArticleAuthor } from './article-author.interface';

export interface Article {
  title: string;
  author: ArticleAuthor;
  tagList: string[];
  body: string;
  updatedAt: Date;
}
