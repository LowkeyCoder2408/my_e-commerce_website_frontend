import UserModel from '../models/UserModel';
import { backendEndpoint } from '../utils/Service/Constant';

const token = localStorage.getItem('token');

export async function getUserById(userId: any): Promise<UserModel> {
  const endpoint = `${backendEndpoint}/users/${userId}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching user with ID ${userId}: ${response.statusText}`,
    );
  }

  const responseUser = await response.json();

  const user: UserModel = {
    id: responseUser.id,
    email: responseUser.email,
    firstName: responseUser.firstName,
    lastName: responseUser.lastName,
    phoneNumber: responseUser.phoneNumber,
    photo: responseUser.photo,
    createdTime: responseUser.createdTime,
    enabled: responseUser.enabled,
    roles: responseUser.roles,
    reviews: responseUser.reviews,
    favoriteProducts: responseUser.favoriteProducts,
    authenticationType: responseUser.authenticationType,
  };

  return user;
}
