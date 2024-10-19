import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  id: number;
  fullName: string;
  photo: string;
  roles: string[];
  enabled: boolean;
}

const AdminRequirement = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
  const WithAdminCheck: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const roles = decodedToken.roles;

        if (roles.length === 1 && roles.includes('Khách hàng')) {
          navigate('/403-error');
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/admin/login');
      }
    }, [navigate]);

    if (!isAuthorized) {
      return null;
    }

    return React.createElement(WrappedComponent, props);
  };

  return WithAdminCheck;
};

export default AdminRequirement;
