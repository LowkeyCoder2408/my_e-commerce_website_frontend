import BlogCommentModel from '../models/BlogCommentModel';
import { backendEndpoint } from '../utils/Service/Constant';
import { publicRequest } from './Request';

export async function getBlogCommentById(
  blogCommentId: number,
): Promise<BlogCommentModel> {
  const url = backendEndpoint + `/blog-comments/${blogCommentId}`;
  const responseData = await publicRequest(url);
  return responseData;
}
