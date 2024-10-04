import AddressModel from '../models/AddressModel';
import { backendEndpoint } from '../utils/Service/Constant';

export async function getAllAddressesByUser(
  userId: any,
): Promise<AddressModel[]> {
  const endpoint =
    backendEndpoint + `/addresses/find-by-user-id?userId=${userId}`;
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const responseData = await response.json();

  const result = responseData.map((data: any) => ({
    id: data.id,
    addressLine: data.addressLine,
    province: data.province,
    district: data.district,
    ward: data.ward,
    userId: data.userId,
    defaultAddress: data.defaultAddress,
  }));

  return result;
}

export async function getDefaultAddressByUserId(
  userId: any,
): Promise<AddressModel | null> {
  const endpoint =
    backendEndpoint +
    `/addresses/find-default-address-by-user-id?userId=${userId}`;
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // Kiểm tra nếu phản hồi là No Content
  if (response.status === 204) {
    return null;
  }

  const responseData = await response.json();

  const result = {
    id: responseData.id,
    addressLine: responseData.addressLine,
    province: responseData.province,
    district: responseData.district,
    ward: responseData.ward,
    userId: responseData.userId,
    defaultAddress: responseData.defaultAddress,
  };

  return result;
}
