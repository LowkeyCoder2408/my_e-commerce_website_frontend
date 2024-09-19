import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import { CheckOutSuccess } from './CheckOutSuccess';
import { CheckOutFailure } from './CheckOutFailure';
import { backendEndpoint } from '../../../utils/Service/Constant';
import Loader from '../../../utils/Loader';

const CheckOutStatus: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const vnpResponseCode = searchParams.get('vnp_ResponseCode') as String;

    if (vnpResponseCode) {
      const checkPaymentStatus = async () => {
        try {
          const response = await fetch(
            backendEndpoint +
              `/vn-pay/payment-result?vnp_ResponseCode=${vnpResponseCode}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          const data = await response.json();

          if (data.result === 'success') {
            setIsSuccess(true);
          } else {
            setIsSuccess(false);
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
          setIsSuccess(false);
        }
      };

      checkPaymentStatus();
    }
  }, []);

  if (isSuccess === null) {
    return <Loader />;
  }

  return <>{isSuccess ? <CheckOutSuccess /> : <CheckOutFailure />}</>;
};

export default CheckOutStatus;
