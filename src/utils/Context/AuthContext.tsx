import React, { createContext, useContext, useEffect, useState } from 'react';
import { isToken, isTokenExpired } from '../Service/JwtService';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Khởi tạo context với giá trị mặc định là undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isToken());

  useEffect(() => {
    if (isToken() && !isTokenExpired()) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext không tồn tại.');
  }
  return context;
};
