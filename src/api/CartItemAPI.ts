import CartItemModel from '../models/CartItemModel';
import { backendEndpoint } from '../utils/Service/Constant';
import { publicRequest } from './Request';

export async function getAllCartItemsByUserId(
  userId: number,
): Promise<CartItemModel[]> {
  const url = backendEndpoint + `/cart-items/findByUserId?userId=${userId}`;
  const responseData = await publicRequest(url);

  return responseData;
}
