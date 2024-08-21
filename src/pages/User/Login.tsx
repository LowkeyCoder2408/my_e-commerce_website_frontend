import { Link, useNavigate } from 'react-router-dom';
import styles from './scss/Login.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backendEndpoint } from '../../utils/Service/Constant';
import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../utils/AdminRequirement';
import { useAuth } from '../../utils/Context/AuthContext';

const cx = classNames.bind(styles);

function Login() {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  // const { setTotalCart, setCartList } = useCartItem();

  useEffect(() => {
    if (isLoggedIn) {
      navigation('/');
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

      if (response.ok) {
        const data = await response.json();
        const { jwt } = data;
        const decodedToken = jwtDecode<JwtPayload>(jwt);
        // Kiểm tra xem tài khoản kích hoạt chưa
        if (decodedToken.enabled === false) {
          toast.warning(
            'Tài khoản của bạn chưa kích hoạt hoặc đã bị vô hiệu hoá',
          );
          return;
        }
        setIsLoggedIn(true); // Đã đăng nhập
        localStorage.setItem('token', jwt);
        window.location.href = '/';

        const cartData: string | null = localStorage.getItem('cart');
        // let cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
        // Khi đăng nhập thành công mà trước đó đã thêm sản phẩm vào giỏ hàng thì các sản phẩm đó sẽ được thêm vào db
        // if (cart.length !== 0) {
        //   cart = cart.map((c) => ({ ...c, idUser: decodedToken.id }));

        //   const endpoint = backendEndpoint + '/cart-item/add-item';
        //   fetch(endpoint, {
        //     method: 'POST',
        //     headers: {
        //       Authorization: `Bearer ${jwt}`,
        //       'content-type': 'application/json',
        //     },
        //     body: JSON.stringify(cart),
        //   })
        //     .then((response) => {
        //       // Lấy giỏ hàng của user khi đăng nhâp thành công
        //       async function getCart() {
        //         const response = await getCartAllByIdUser();
        //         // Xoá cart mà lúc chưa đăng nhập
        //         localStorage.removeItem('cart');
        //         cart = response;
        //         // Thêm cart lúc đăng nhập
        //         localStorage.setItem('cart', JSON.stringify(cart));
        //         setTotalCart(cart.length);
        //         setCartList(cart);
        //       }
        //       getCart();
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
        // } else {
        //   // Lấy giỏ hàng của user khi đăng nhâp thành công
        //   const response = await getCartAllByIdUser();
        //   // Xoá cart mà lúc chưa đăng nhập
        //   localStorage.removeItem('cart');
        //   cart = response;
        //   // Thêm cart lúc đăng nhập
        //   localStorage.setItem('cart', JSON.stringify(cart));
        //   setTotalCart(cart.length);
        //   setCartList(cart);
        // }

        // Kiểm tra role để chuyển về link
        // if (!decodedToken.roles.includes('Khách hàng')) {
        //   navigation('/admin/dashboard');
        // } else {
        //   navigation('/');
        // }
      } else {
        toast.error('Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Đăng nhập thất bại: ', error);
      toast.error('Đăng nhập thất bại');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (isLoggedIn) {
    return <></>;
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
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
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
