import ReviewModel from '../models/ReviewModel';
import { backendEndpoint } from '../utils/Service/Constant';
import { publicRequest } from './Request';

export async function getReviewsByProduct(
  productId: number,
): Promise<ReviewModel[]> {
  const url: string = backendEndpoint + `/products/${productId}`;

  const response = await publicRequest(url);
  const responseData: any = response.reviews;

  return responseData;
}

export async function getUserReviewByProduct(
  userId: number,
  productId: number,
): Promise<ReviewModel | null> {
  const url: string =
    backendEndpoint +
    `/reviews/findByUserIdAndProductId?userId=${userId}&productId=${productId}`;
  const responseData = await publicRequest(url);

  return responseData;
}

export const deleteReview = async (reviewId: number, token: string) => {
  const endpoint = `/reviews/delete-review/${reviewId}`;
  return fetch(backendEndpoint + endpoint, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
