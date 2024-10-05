import { toast } from 'react-toastify';
import BlogCategoryModel from '../models/BlogCategoryModel';
import { backendEndpoint } from '../utils/Service/Constant';

export const getAllBlogCategories = async (): Promise<BlogCategoryModel[]> => {
  try {
    const response = await fetch(`${backendEndpoint}/blog-categories`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: BlogCategoryModel[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    toast.error('Không thể lấy danh sách danh mục bài đăng');
    return [];
  }
};
