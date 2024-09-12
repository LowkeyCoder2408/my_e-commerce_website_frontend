import { isTokenExpired } from '../utils/Service/JwtService';

export async function publicRequest(endpoint: string) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Không thể truy cập ${endpoint}`);
  }
  return response.json();
}

export async function adminRequest(endpoint: string) {
  const token = localStorage.getItem('token') || '';

  if (!token || !isTokenExpired()) {
    throw new Error('Access token không tồn tại hoặc đã hết hạn');
  }
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Không thể truy cập ${endpoint}`);
  }
  return response.json();
}
