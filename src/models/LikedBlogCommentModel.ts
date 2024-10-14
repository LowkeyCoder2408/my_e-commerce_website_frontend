class LikedBlogCommentModel {
  id: number;
  blogCommentId: number;
  userId: number;
  likedAt: Date;

  constructor(
    id: number,
    blogCommentId: number,
    userId: number,
    likedAt: Date,
  ) {
    this.id = id;
    this.blogCommentId = blogCommentId;
    this.userId = userId;
    this.likedAt = likedAt;
  }
}

export default LikedBlogCommentModel;
