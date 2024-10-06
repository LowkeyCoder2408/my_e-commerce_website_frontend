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

export async function getAndFindBlogs(
  size: number,
  page: number,
  blogCategoryName: string,
  keyword: string,
): Promise<ResultInterface> {
  keyword = keyword.trim();

  let url = '';

  if (keyword && blogCategoryName && blogCategoryName !== 'Tất cả') {
    url =
      backendEndpoint +
      `/blogs/find-by-name-containing-and-blog-category-name?size=${size}&page=${page}&blogCategoryName=${blogCategoryName}&keyword=${keyword}`;
  } else if (keyword) {
    url =
      backendEndpoint +
      `/blogs/find-by-name-containing?size=${size}&page=${page}&keyword=${keyword}`;
  } else if (blogCategoryName && blogCategoryName !== 'Tất cả') {
    url =
      backendEndpoint +
      `/blogs/find-by-blog-category-name?size=${size}&page=${page}&blogCategoryName=${blogCategoryName}`;
  } else {
    url = backendEndpoint + `/blogs?size=${size}&page=${page}`;
  }

  return getBlogsWithEmbedded(url);
}

export async function getNewestBlogs(
  totalElements: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/blogs?sortBy=createdAt&sortDir=desc&page=0&size=${totalElements}`;

  return getBlogsWithEmbedded(url);
}

export async function getBlogById(blogId: number): Promise<BlogModel> {
  const url = backendEndpoint + `/blogs/${blogId}`;
  const responseData = await publicRequest(url);
  return responseData;
}
