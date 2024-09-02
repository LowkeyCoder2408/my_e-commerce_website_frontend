import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../AdminRequirement';

export function isTokenExpired() {
  const token = localStorage.getItem('token') || '';
  try {
    const decodedToken: any = jwtDecode(token);

    if (!decodedToken.exp) {
      return false;
    }

    const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
    return currentTime >= decodedToken.exp;
  } catch (error) {
    // Nếu có lỗi khi giải mã token, coi như token không hợp lệ (cũng có thể đã hết hạn)
    return true;
  }
}

export function isToken() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
}

export function getPhotoByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.photo;
  }
}

export function getFullNameByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.fullName;
  }
}

export function getEmailByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    return jwtDecode(token).sub;
  }
}

export function getUserIdByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.id;
  }
}

export function getRolesByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.roles;
  }
}

export function logout(navigate: any) {
  navigate('/login');
  localStorage.removeItem('token');
  localStorage.removeItem('cart');
}
