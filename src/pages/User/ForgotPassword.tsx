import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Context/AuthContext';
import { toast } from 'react-toastify';
import { backendEndpoint } from '../../utils/Service/Constant';
import styles from './scss/ForgotPassword.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async () => {
    toast.promise(
      fetch(backendEndpoint + '/users/forgot-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok && data.status === 'success') {
            toast.success(
              data.message ||
                'Gửi email thành công, vui lòng kiểm tra email để lấy lại mật khẩu',
            );
            setEmail('');
          } else {
            toast.error(
              data.message || 'Gặp lỗi trong quá trình lấy lại mật khẩu',
            );
          }
        })
        .catch((error) => {
          toast.error('Yêu cầu lấy lại mật khẩu không thành công');
          console.log(error);
        }),
      { pending: 'Đang trong quá trình xử lý ...' },
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className={`${cx('forgot-password__container')} container`}>
      <div className="row">
        <div
          className={`${cx('forgot-password__form')} col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12`}
        >
          <h1
            className={`${cx('forgot-password__form-title')} text-center mt-5`}
          >
            <strong>QUÊN MẬT KHẨU</strong>
          </h1>
          <div className="mt-3 mb-5">
            <form className="form" autoComplete="off">
              <div className="row mb-0">
                <div
                  className={`${cx('forgot-password__input-box__field')} col col-xxl-12 col-xl-12 col-lg-12 col-md-12`}
                >
                  <div className={cx('forgot-password__input-box')}>
                    <input
                      required
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Email</span>
                  </div>
                </div>
              </div>
              <button
                className="container-fluid py-2 btn btn-primary mt-4"
                type="button"
                onClick={handleSubmit}
                style={{ fontSize: '1.6rem' }}
              >
                LẤY LẠI MẬT KHẨU
              </button>
            </form>
          </div>
        </div>
        <div
          className={`${cx('forgot-password__logo')} col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 d-flex flex-column justify-content-center align-items-center`}
        >
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707592447/logo_main_tes0gp.png"
            alt=""
          />
          <h3>
            <strong>Tech Solutions, Hub Excellence</strong>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
