import BlogModel from '../models/BlogModel';
import { backendEndpoint } from '../utils/Service/Constant';
import { publicRequest } from './Request';

interface ResultInterface {
  result: BlogModel[];
  totalPages: number;
  totalElements: number;
}

async function getBlogsWithEmbedded(url: string): Promise<ResultInterface> {
  const response = await publicRequest(url);
  const responseData: any = response._embedded;
  const totalPages: number = response.totalPages;
  const totalElements: number = response.totalElements;

  const result = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    title: data.title,
    content: data.content,
    author: data.author,
    blogCategory: data.blogCategory,
    featuredImage: data.featuredImage,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }));

  return {
    result: result,
    totalPages: totalPages,
    totalElements: totalElements,
  };
}

export async function getAllBlogsNoFilter(): Promise<ResultInterface> {
  const url = backendEndpoint + '/blogs?size=1000';
  return getBlogsWithEmbedded(url);
}

export async function getAllFilteredBlogs(
  size: number,
  page: number,
  blogCategoryName: string,
): Promise<ResultInterface> {
  let url: string = '';

  if (blogCategoryName === 'Tất cả') {
    url = backendEndpoint + `/blogs?size=${size}&page=${page}`;
  } else {
    url =
      backendEndpoint +
      `/blogs/find-by-blog-category-name?blogCategoryName=${blogCategoryName}&size=${size}&page=${page}`;
  }
  return getBlogsWithEmbedded(url);
}
