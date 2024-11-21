import BlogCategoryModel from './BlogCategoryModel';
import BlogCommentModel from './BlogCommentModel';
import UserModel from './UserModel';

class BlogModel {
  id: number;
  title: string;
  content: string;
  author: UserModel;
  blogCategory: BlogCategoryModel;
  featuredImage: string;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  comments: BlogCommentModel[];

  constructor(
    id: number,
    title: string,
    content: string,
    author: UserModel,
    blogCategory: BlogCategoryModel,
    featuredImage: string,
    createdAt: Date,
    updatedAt: Date,
    likesCount: number,
    comments: BlogCommentModel[],
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.blogCategory = blogCategory;
    this.featuredImage = featuredImage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.likesCount = likesCount;
    this.comments = comments;
  }
}

export default BlogModel;
