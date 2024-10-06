import { toast } from 'react-toastify';
import UserModel from '../models/UserModel';
import { backendEndpoint } from '../utils/Service/Constant';

export async function getUserById(userId: any): Promise<UserModel> {
  const endpoint = `${backendEndpoint}/users/${userId}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    lastLoginTime: responseUser.lastLoginTime,
  };

  return user;
}

export async function changeAvatar(avatar: File | null, userId: number) {
  const formData = new FormData();

  avatar && formData.append('avatar', avatar);
  if (userId !== undefined) {
    formData.append('userId', userId.toString());
  } else {
    throw new Error('Mã người dùng không hợp lệ');
  }

  try {
    const response = await fetch(`${backendEndpoint}/users/change-avatar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to change avatar');
    }
    return response.json();
  } catch (error) {
    toast.error('Đã xảy ra lỗi khi thay đổi ảnh đại diện');
    console.error(error);
    throw error;
  }
}
