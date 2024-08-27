import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../AdminRequirement';

export function isTokenExpired(token: string) {
  const decodedToken = jwtDecode(token);

  if (!decodedToken.exp) {
    // Token không có thời gian hết hạn (exp)
    return false;
  }
  const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
  return currentTime < decodedToken.exp;
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
