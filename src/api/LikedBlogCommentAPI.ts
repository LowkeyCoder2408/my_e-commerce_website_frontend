import LikedBlogCommentModel from '../models/LikedBlogCommentModel';
import { backendEndpoint } from '../utils/Service/Constant';
import { getUserIdByToken } from '../utils/Service/JwtService';

export const fetchLikedBlogCommentsByUserId = async (): Promise<
  LikedBlogCommentModel[]
> => {
  try {
    const response = await fetch(
      backendEndpoint +
        `/liked-blog-comments/find-by-user?userId=${getUserIdByToken()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Đã xảy ra lỗi khi lấy danh sách bài đăng yêu thích');
    return [];
  }
};
