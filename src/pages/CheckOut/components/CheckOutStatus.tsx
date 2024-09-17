import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import { CheckOutSuccess } from './CheckOutSuccess';
import { CheckOutFail } from './CheckOutFail';

const CheckOutStatus: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation('/login');
    }
  }, []);

  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const vnpResponseCode = searchParams.get('vnp_ResponseCode');

    if (vnpResponseCode === '00') {
      setIsSuccess(true);
    } else {
      //   const token = localStorage.getItem('token');
      //   fetch(backendEndpoint + '/order/cancel-order', {
      //     method: 'PUT',
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'content-type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       idUser: getUserIdByToken(),
      //     }),
      //   }).catch((error) => {
      //     console.log(error);
      //   });
    }
  }, [location.search]);

  return <>{isSuccess ? <CheckOutSuccess /> : <CheckOutFail />}</>;
};

export default CheckOutStatus;
