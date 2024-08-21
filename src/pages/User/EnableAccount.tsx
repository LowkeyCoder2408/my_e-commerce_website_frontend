import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { backendEndpoint } from '../../utils/Service/Constant';

function EnableAccount() {
  // const { isLoggedIn } = useAuth();
  const navigation = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigation('/');
  //   }
  // });

  const { email } = useParams();
  const { verificationCode } = useParams();
  const [isEnabled, setIsEnabled] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (email && verificationCode) {
      handleEnable();
    }
  }, []);

  const handleEnable = async () => {
    try {
      const endpoint: string =
        backendEndpoint +
        `/auth/enable?email=${email}&verificationCode=${verificationCode}`;
      const response = await fetch(endpoint, {
        method: 'GET',
      });

      if (response.ok) {
        setIsEnabled(true);
      } else {
        setNotification(response.text + '');
      }
    } catch (error) {
      console.log('Lỗi kích hoạt: ' + error);
    }
  };

  return (
    <div
      className="container mt-5 bg-white text-center"
      style={{ borderRadius: '10px', padding: '40px' }}
    >
      <div>
        <h1 className="text-uppercase" style={{ fontWeight: 600 }}>
          Kích hoạt tài khoản
        </h1>
        {isEnabled ? (
          <p className="mt-4">
            Tài khoản đã được kích hoạt thành công, vui lòng{' '}
            <Link
              to={'/login'}
              className="text-uppercase"
              style={{ fontWeight: 600 }}
            >
              đăng nhập
            </Link>{' '}
            để tiếp tục!
          </p>
        ) : (
          <p className="mt-4">
            Tài khoản kích hoạt thất bại. Có thể do bạn đã kích hoạt tài khoản
            trước đó.
          </p>
        )}
      </div>
    </div>
  );
}

export default EnableAccount;
