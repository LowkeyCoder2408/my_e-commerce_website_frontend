import styles from './scss/Information.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBlog,
  faCartShopping,
  faExchange,
  faHeart,
  faReceipt,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import {
  getFullNameByToken,
  getPhotoByToken,
  logout,
} from '../../../../utils/Service/JwtService';
import { Avatar } from '@mui/material';
import { useAuth } from '../../../../utils/Context/AuthContext';
import { useFavoriteProducts } from '../../../../utils/Context/FavoriteProductContext';
import { useCartItems } from '../../../../utils/Context/CartItemContext';

const cx = classNames.bind(styles);

function Information() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { favoriteProducts } = useFavoriteProducts();
  const { cartItems } = useCartItems();

  return (
    <div className="container-fluid bg-dark text-white">
      <div className="container">
        <div
          className="row"
          style={{
            minHeight: '50px',
          }}
        >
          <div
            className={`${cx('justify-content-center-mobile')} col-md-6 col-sm-6 col-xs-12 py-3 d-flex align-items-center`}
          >
            <span>
              Miễn ship trên toàn quốc và đối với hóa đơn từ{' '}
              <strong>5.000.000đ</strong> (ngoại quốc)
            </span>
          </div>
          {!isLoggedIn ? (
            <div
              className={`col-md-6 col-sm-6 col-xs-12 text-end py-3 d-flex align-items-center justify-content-end ${cx('justify-content-center-mobile')}`}
            >
              <span>
                <FontAwesomeIcon className="pe-3" icon={faUser as IconProp} />
                <Link
                  className={`${cx('hover-yellow')} text-white`}
                  to="/login"
                >
                  ĐĂNG NHẬP
                </Link>
                {' | '}
                <Link
                  className={`${cx('hover-yellow')} text-white`}
                  to="/register"
                >
                  ĐĂNG KÝ
                </Link>
              </span>
            </div>
          ) : (
            <div
              className={`${cx('justify-content-center-small-mobile', 'justify-content-center-mobile')} col-md-6 col-sm-6 col-xs-12 d-flex justify-content-end align-items-center text-end py-3 gap-3`}
            >
              <Link
                to={'/shopping-cart'}
                title="Giỏ hàng của bạn"
                className={cx('information__info')}
              >
                <div className={cx('information__info-wrap')}>
                  <FontAwesomeIcon
                    style={{ color: '#fff', width: '20px', height: '20px' }}
                    className="me-3"
                    icon={faCartShopping as IconProp}
                  />
                  {cartItems.length > 0 && (
                    <span
                      className={`${cx('information__info-notice')} text-white`}
                    >
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </Link>
              <Link
                to={'/wish-list'}
                title="Sản phẩm yêu thích"
                className={cx('information__info')}
              >
                <div className={cx('information__info-wrap')}>
                  <FontAwesomeIcon
                    style={{ color: '#fff', width: '20px', height: '20px' }}
                    className="me-3"
                    icon={faHeart as IconProp}
                  />
                  {favoriteProducts.length > 0 && (
                    <span
                      className={`${cx('information__info-notice')} text-white`}
                    >
                      {favoriteProducts.length}
                    </span>
                  )}
                </div>
              </Link>
              <div>Hi, {`${getFullNameByToken()}`}</div>
              <Avatar
                alt={`"Ảnh của" ${getFullNameByToken()}`}
                src={
                  getPhotoByToken() ||
                  'https://res.cloudinary.com/dgdn13yur/image/upload/v1710904428/avatar_sjugj8.png'
                }
                sx={{ width: 30, height: 30 }}
              />
              <div className={`${cx('btn-group')} btn-group`}>
                <button
                  style={{ backgroundColor: 'transparent' }}
                  className={`${cx('dropdown-toggle')} dropdown-toggle`}
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu dropdown-menu-end mt-2">
                  <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <Link to={'/my-profile'}>
                      <button
                        className="dropdown-item d-flex gap-3 align-items-center"
                        type="button"
                      >
                        <FontAwesomeIcon
                          style={{ width: '12px', height: '12px' }}
                          icon={faUser as IconProp}
                        />
                        Thông tin cá nhân
                      </button>
                    </Link>
                  </li>
                  <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <Link to={'/my-order'}>
                      <button
                        className="dropdown-item d-flex gap-3 align-items-center"
                        type="button"
                      >
                        <FontAwesomeIcon
                          style={{ width: '12px', height: '12px' }}
                          icon={faReceipt as IconProp}
                        />
                        Đơn hàng của tôi
                      </button>
                    </Link>
                  </li>
                  <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <Link to={'/my-blogs'}>
                      <button
                        className="dropdown-item d-flex gap-3 align-items-center"
                        type="button"
                      >
                        <FontAwesomeIcon
                          style={{ width: '12px', height: '12px' }}
                          icon={faBlog as IconProp}
                        />
                        Bài đăng của tôi
                      </button>
                    </Link>
                  </li>
                  <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <Link to={'/change-password'}>
                      <button
                        className="dropdown-item d-flex gap-3 align-items-center"
                        type="button"
                      >
                        <FontAwesomeIcon
                          style={{ width: '12px', height: '12px' }}
                          icon={faExchange as IconProp}
                        />
                        Đổi mật khẩu
                      </button>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <button
                      className="dropdown-item d-flex gap-3 align-items-center"
                      type="button"
                      onClick={() => {
                        confirm({
                          title: (
                            <span style={{ fontSize: '20px' }}>ĐĂNG XUẤT</span>
                          ),
                          description: (
                            <span style={{ fontSize: '16px' }}>
                              Bạn có chắc chắn là sẽ đăng xuất chứ?
                            </span>
                          ),
                          confirmationText: (
                            <span style={{ fontSize: '15px' }}>Đồng ý</span>
                          ),
                          cancellationText: (
                            <span style={{ fontSize: '15px' }}>Huỷ</span>
                          ),
                        })
                          .then(() => {
                            logout(navigate);
                            toast.success('Đăng xuất khỏi website thành công');
                            setIsLoggedIn(false);
                          })
                          .catch(() => {});
                      }}
                    >
                      <FontAwesomeIcon
                        style={{ width: '12px', height: '12px' }}
                        icon={faSignOut as IconProp}
                      />
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Information;
