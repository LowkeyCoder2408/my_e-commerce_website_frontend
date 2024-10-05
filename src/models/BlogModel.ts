import BlogCategoryModel from './BlogCategoryModel';
import UserModel from './UserModel';

class BlogModel {
  id: number;
  name: string;
  title: string;
  content: string;
  author: UserModel;
  blogCategory: BlogCategoryModel;
  featuredImage: string;
  tocreatedAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    name: string,
    title: string,
    content: string,
    author: UserModel,
    blogCategory: BlogCategoryModel,
    featuredImage: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.content = content;
    this.author = author;
    this.blogCategory = blogCategory;
    this.featuredImage = featuredImage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default BlogModel;
