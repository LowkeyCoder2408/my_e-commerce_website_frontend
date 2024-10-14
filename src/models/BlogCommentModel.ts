import UserModel from './UserModel';

class BlogCommentModel {
  id: number;
  content: string;
  blogId: number;
  user: UserModel;
  createdAt: Date;
  parentCommentId: number;
  replies: BlogCommentModel[];
  authorComment: boolean;
  replyTo: string;

  constructor(
    id: number,
    content: string,
    blogId: number,
    user: UserModel,
    createdAt: Date,
    parentCommentId: number,
    replies: BlogCommentModel[],
    authorComment: boolean,
    replyTo: string,
  ) {
    this.id = id;
    this.content = content;
    this.blogId = blogId;
    this.user = user;
    this.createdAt = createdAt;
    this.parentCommentId = parentCommentId;
    this.replies = replies;
    this.authorComment = authorComment;
    this.replyTo = replyTo;
  }
}

export default BlogCommentModel;
