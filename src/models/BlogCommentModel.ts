import UserModel from './UserModel';

class BlogCommentModel {
  id: number;
  content: string;
  blogId: number;
  user: UserModel;
  createdAt: Date;

  constructor(
    id: number,
    content: string,
    blogId: number,
    user: UserModel,
    createdAt: Date,
  ) {
    this.id = id;
    this.content = content;
    this.blogId = blogId;
    this.user = user;
    this.createdAt = createdAt;
  }
}

export default BlogCommentModel;
