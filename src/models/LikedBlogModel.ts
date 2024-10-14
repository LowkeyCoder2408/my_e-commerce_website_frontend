class LikedBlogModel {
  id: number;
  blogId: number;
  userId: number;
  likedAt: Date;

  constructor(id: number, blogId: number, userId: number, likedAt: Date) {
    this.id = id;
    this.blogId = blogId;
    this.userId = userId;
    this.likedAt = likedAt;
  }
}

export default LikedBlogModel;
