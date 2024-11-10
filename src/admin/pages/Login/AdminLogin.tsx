import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backendEndpoint } from '../../../utils/Service/Constant';
import classNames from 'classnames/bind';
import { useAuth } from '../../../utils/Context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LoadingButton from '@mui/lab/LoadingButton';
import { LoginOutlined } from '@mui/icons-material';

const cx = classNames.bind(styles);

function AdminLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>('Chưa điền thông tin');
  const [passwordError, setPasswordError] = useState<boolean>(true);

  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/dashboard');
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

  const checkValidPassword = (password: string) => {
    if (password.trim() === '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    checkValidPassword(password);
  };

  const handleAdminLogin = async () => {
    setSubmitLoading(true);

    try {
      const loginRequest = { email, password };
      const response = await fetch(`${backendEndpoint}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const token = data.token;

        if (typeof token === 'string') {
          // Đăng nhập thành công
          setIsLoggedIn(true);
          localStorage.setItem('token', token);

          const from = location.state?.from;
          if (from) {
            navigate(from);
          } else {
            navigate('/admin/dashboard');
          }
          toast.success(data.message || 'Đăng nhập thành công');
        } else {
          toast.error('Token không hợp lệ');
        }
      } else {
        toast.error(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Đăng nhập thất bại: ', error);
      toast.error(
        'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau',
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdminLogin();
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className={`${cx('login__container')} container`}>
      <div className="row">
        <div
          className={`${cx('login__form')} col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12`}
        >
          <h1 className={`${cx('login__form-title')} text-center mt-5`}>
            <strong>ĐĂNG NHẬP</strong>
          </h1>
          <div className="mt-3 mb-5">
            <form className="form" autoComplete="off">
              <div className="row mb-0">
                <div
                  className={`${cx('login__input-box__field')} col col-xxl-12 col-xl-12 col-lg-12 col-md-12`}
                >
                  <div className={cx('login__input-box')}>
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
                        <div className={cx('login__error')}>
                          {emailError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('login__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`${cx('login__input-box__field')} col col-12`}>
                  <div className={`${cx('login__input-box')} d-flex`}>
                    <input
                      required
                      type={`${isHidePassword ? 'password' : 'text'}`}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      autoComplete="new-password"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Mật khẩu</span>
                    <div className="d-flex">
                      {passwordError ? (
                        <div className={cx('login__error')}>
                          {passwordError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('login__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                    <div
                      className={`${cx('login__input-box-eye')} cursor-pointer`}
                      onClick={() => {
                        setIsHidePassword(!isHidePassword);
                      }}
                    >
                      {!isHidePassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <label htmlFor="remember-me" className="d-flex gap-2 mt-3">
                  <input id="remember-me" type="checkbox" value="remember-me" />
                  Ghi nhớ tài khoản
                </label>
                <div className={`${cx('login__transfer')}`}>
                  <Link to={'/forgot-password'} className="mt-3">
                    <strong>Quên mật khẩu</strong>
                  </Link>
                </div>
              </div>
              <LoadingButton
                disabled={emailError !== '' || passwordError}
                fullWidth
                onClick={handleAdminLogin}
                loading={submitLoading}
                loadingPosition="start"
                startIcon={<LoginOutlined />}
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
                  opacity: emailError !== '' || passwordError ? 0.5 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div className="text-white" style={{ fontSize: '1.6rem' }}>
                  ĐĂNG NHẬP
                </div>
              </LoadingButton>

              <div className={`${cx('login__transfer')} mb-4`}>
                <span>
                  Bạn chưa có tài khoản quản trị viên?{' '}
                  <Link to={'/'}>Mua sắm ngay</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${cx('login__logo')} col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 d-flex flex-column justify-content-center align-items-center`}
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
}

export default AdminLogin;
