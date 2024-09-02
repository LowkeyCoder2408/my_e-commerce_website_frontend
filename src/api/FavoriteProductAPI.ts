import { toast } from 'react-toastify';
import { backendEndpoint } from '../utils/Service/Constant';
import { getUserIdByToken } from '../utils/Service/JwtService';
import FavoriteProductModel from '../models/FavoriteProductModel';

export const fetchFavoriteProductsByUserId = async (): Promise<
  FavoriteProductModel[]
> => {
  const userId = getUserIdByToken();
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(
      backendEndpoint + `/favorite-products/find-by-user?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error('Đã xảy ra lỗi khi lấy danh sách sản phẩm yêu thích');
    return [];
  }
};
