import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './scss/Login.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backendEndpoint } from '../../utils/Service/Constant';
import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../utils/AdminRequirement';
import { useAuth } from '../../utils/Context/AuthContext';
import { useFavoriteProducts } from '../../utils/Context/FavoriteProductContext';
import { useCartItems } from '../../utils/Context/CartItemContext';

const cx = classNames.bind(styles);

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { fetchFavoriteProducts } = useFavoriteProducts();
  const { fetchCartItems } = useCartItems();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const handleLogin = async () => {
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
        window.location.reload();
        const token = data.token;

        if (typeof token === 'string') {
          // Đăng nhập thành công
          setIsLoggedIn(true);
          localStorage.setItem('token', token);

          const from = location.state?.from;
          if (from) {
            navigate(from);
          } else {
            navigate('/');
          }

          fetchFavoriteProducts();
          fetchCartItems();
          // toast.success(data.message || 'Đăng nhập thành công');
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
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
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
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Email</span>
                  </div>
                </div>
                <div className={`${cx('login__input-box__field')} col col-12`}>
                  <div className={cx('login__input-box')}>
                    <input
                      required
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Mật khẩu</span>
                  </div>
                </div>
              </div>
              <label htmlFor="remember-me" className="d-flex gap-2 mt-3">
                <input id="remember-me" type="checkbox" value="remember-me" />
                Ghi nhớ tài khoản
              </label>
              <button
                className="container-fluid py-2 btn btn-primary mt-3"
                type="button"
                onClick={handleLogin}
                style={{ fontSize: '1.6rem' }}
              >
                ĐĂNG NHẬP
              </button>
              <div className={`${cx('login__transfer')} mb-4`}>
                <span>
                  Bạn chưa có tài khoản? Vui lòng chọn{' '}
                  <Link to={'/register'}>Đăng ký</Link>
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

export default Login;
