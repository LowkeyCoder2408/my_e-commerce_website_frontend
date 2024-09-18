import DeliveryMethodModel from '../models/DeliveryMethodModel';
import { backendEndpoint } from '../utils/Service/Constant';
import { publicRequest } from './Request';

export async function getAllDeliveryMethods(): Promise<DeliveryMethodModel[]> {
  const endpoint = backendEndpoint + '/delivery-methods';
  const responseData = await publicRequest(endpoint);

  const result = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    description: data.description,
    estimatedDays: data.estimatedDays,
    deliveryFee: data.deliveryFee,
  }));

  return result;
}
