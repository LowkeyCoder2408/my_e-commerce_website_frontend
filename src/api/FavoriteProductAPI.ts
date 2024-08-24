import FavoriteProductModel from '../models/FavoriteProductModel';
import { backendEndpoint } from '../utils/Service/Constant';
import { publicRequest } from './Request';

export async function getAllFavoriteProductsByUserId(
  userId: number,
): Promise<FavoriteProductModel[]> {
  const url =
    backendEndpoint + `/favorite-products/findByUserId?userId=${userId}`;
  const responseData = await publicRequest(url);

  return responseData;
}
