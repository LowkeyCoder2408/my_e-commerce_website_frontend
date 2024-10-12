import { toast } from 'react-toastify';
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

export async function getMyBlogs(
  userId: number,
  size: number,
  page: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/blogs/find-by-user?userId=${userId}&sortBy=createdAt&sortDir=desc&page=${page}&size=${size}`;

  return getBlogsWithEmbedded(url);
}

export async function addABlog(
  title: string,
  blogCategoryName: string,
  content: string,
  image: File | null,
) {
  const formData = new FormData();

  title && formData.append('title', title);
  blogCategoryName && formData.append('blogCategoryName', blogCategoryName);
  content && formData.append('content', content.toString());
  image && formData.append('image', image);

  // try {
  const response = await fetch(`${backendEndpoint}/blogs/add-blog`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Xảy ra lỗi khi thêm bài đăng');
  }
  return response.json();
}

export async function updateABlog(
  blogId: number,
  title: string,
  blogCategoryName: string,
  content: string,
  image: File | null,
) {
  const formData = new FormData();

  title && formData.append('title', title);
  blogCategoryName && formData.append('blogCategoryName', blogCategoryName);
  content && formData.append('content', content.toString());
  image && formData.append('image', image);

  const response = await fetch(
    `${backendEndpoint}/blogs/update-blog/${blogId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error('Xảy ra lỗi khi cập nhật bài đăng');
  }
  return response.json();
}
