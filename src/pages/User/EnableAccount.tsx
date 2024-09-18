import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { backendEndpoint } from '../../utils/Service/Constant';
import { useAuth } from '../../utils/Context/AuthContext';

function EnableAccount() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { email, verificationCode } = useParams();

  const [notification, setNotification] = useState('');

  // Ref để theo dõi xem API đã được gọi chưa
  const hasCalledEnable = useRef(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
      return;
    }
    if (email && verificationCode && !hasCalledEnable.current) {
      handleEnable();
      hasCalledEnable.current = true;
    }
  }, []);

  const handleEnable = async () => {
    try {
      const response = await fetch(
        `${backendEndpoint}/auth/enable?email=${email}&verificationCode=${verificationCode}`,
        {
          method: 'GET',
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'success') {
          setNotification(
            data.message ||
              'Kích hoạt tài khoản thành công, vui lòng đăng nhập để trải nghiệm nền tảng của chúng tôi',
          );
        } else {
          setNotification(
            data.message ||
              'Đã xảy ra lỗi trong quá trình kích hoạt tài khoản, vui lòng liên hệ với quản trị viên để giải quyết sự cố',
          );
        }
      } else {
        setNotification(
          data.message ||
            'Đã xảy ra lỗi trong quá trình kích hoạt tài khoản, vui lòng liên hệ với quản trị viên để giải quyết sự cố',
        );
      }
    } catch (error) {
      setNotification('Đã xảy ra lỗi kích hoạt: ' + error);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div
          className="container mt-5 bg-white text-center"
          style={{ borderRadius: '10px', padding: '40px' }}
        >
          <div>
            <div className="default-title">Kích hoạt tài khoản</div>
            <p className="mt-4">{notification}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EnableAccount;
