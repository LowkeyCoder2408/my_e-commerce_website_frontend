import LikedBlogModel from '../models/LikedBlogModel';
import { backendEndpoint } from '../utils/Service/Constant';
import { getUserIdByToken } from '../utils/Service/JwtService';

export const fetchLikedBlogsByUserId = async (): Promise<LikedBlogModel[]> => {
  try {
    const response = await fetch(
      backendEndpoint +
        `/liked-blogs/find-by-user?userId=${getUserIdByToken()}`,
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
