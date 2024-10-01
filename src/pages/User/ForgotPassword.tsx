import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Context/AuthContext';
import { toast } from 'react-toastify';
import { backendEndpoint } from '../../utils/Service/Constant';
import styles from './scss/ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LoadingButton from '@mui/lab/LoadingButton';
import { Send } from '@mui/icons-material';

const cx = classNames.bind(styles);

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>('Chưa điền thông tin');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const checkValidEmail = (email: string) => {
    if (email.trim() === '') {
      setEmailError('Chưa điền thông tin');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    checkValidEmail(email);
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

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
          setEmailError('Chưa điền thông tin');
        } else {
          toast.error(
            data.message || 'Gặp lỗi trong quá trình lấy lại mật khẩu',
          );
        }
      })
      .catch((error) => {
        toast.error('Yêu cầu lấy lại mật khẩu không thành công');
        console.log(error);
      })
      .finally(() => setSubmitLoading(false));
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
          <p className="text-center mt-3">
            Vui lòng nhập địa chỉ email của bạn. Sau ghi nhập email, chúng tôi
            sẽ gửi một liên kết để giúp bạn đặt lại mật khẩu.
          </p>
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
                      onChange={handleEmailChange}
                      autoComplete="email"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Email</span>
                    <div className="d-flex">
                      {emailError ? (
                        <div className={cx('forgot-password__error')}>
                          {emailError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('forgot-password__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <LoadingButton
                disabled={emailError !== ''}
                fullWidth
                onClick={handleSubmit}
                loading={submitLoading}
                loadingPosition="start"
                startIcon={<Send />}
                sx={{
                  marginTop: '7px',
                  padding: '3px 0',
                  color: '#fff',
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& svg': {
                    color: 'white',
                  },
                  border: 'none',
                  opacity: emailError !== '' || submitLoading ? 0.5 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div className="text-white" style={{ fontSize: '1.6rem' }}>
                  GỬI YÊU CẦU
                </div>
              </LoadingButton>
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
