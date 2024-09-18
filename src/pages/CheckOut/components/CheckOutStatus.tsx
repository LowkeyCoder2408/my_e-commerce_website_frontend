import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import { CheckOutSuccess } from './CheckOutSuccess';
import { CheckOutFailure } from './CheckOutFailure';
import Loader from '../../../utils/Loader';
import { backendEndpoint } from '../../../utils/Service/Constant';

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
    return (
      <div
        className="container mt-5 bg-white text-center"
        style={{ borderRadius: '10px', padding: '40px' }}
      >
        <div>
          <h1 className="default-title">Không Có Giao Dịch</h1>
          <p className="mt-4">
            Chúng tôi không tìm thấy giao dịch nào với mã bạn cung cấp (hoặc mã
            bị trống). Vui lòng kiểm tra lại thông tin hoặc liên hệ với hỗ trợ
            khách hàng nếu cần thêm sự trợ giúp.
          </p>
        </div>
      </div>
    );
  }

  return <>{isSuccess ? <CheckOutSuccess /> : <CheckOutFailure />}</>;
};

export default CheckOutStatus;
