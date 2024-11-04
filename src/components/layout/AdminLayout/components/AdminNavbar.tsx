import { Link, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../utils/Context/AuthContext';
import {
  getFullNameByToken,
  getPhotoByToken,
  logout,
} from '../../../../utils/Service/JwtService';
import styles from '../scss/AdminNavbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AdminNavbar = () => {
  const userAvatar = getPhotoByToken();
  const userName = getFullNameByToken();
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const confirm = useConfirm();

  return (
    <div className={cx('admin-navbar')}>
      <Link to={'/admin/dashboard'} className={cx('admin-navbar__logo')}>
        <div className={`${cx('admin-navbar__logo-title')} text-white`}>
          TechHubAdmin
        </div>
      </Link>
      <div className={cx('admin-navbar__icons')}>
        <img src="/search.svg" alt="" className={cx('admin-navbar__icon')} />
        <img src="/app.svg" alt="" className={cx('admin-navbar__icon')} />
        <img src="/expand.svg" alt="" className={cx('admin-navbar__icon')} />
        <div className={cx('admin-navbar__notification')}>
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className={cx('admin-navbar__user')}>
          <img src={userAvatar} alt="" />
          <span>{userName}</span> -{' '}
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              confirm({
                title: <span style={{ fontSize: '20px' }}>ĐĂNG XUẤT</span>,
                description: (
                  <span style={{ fontSize: '16px' }}>
                    Bạn có chắc chắn là sẽ đăng xuất chứ?
                  </span>
                ),
                confirmationText: (
                  <span style={{ fontSize: '15px' }}>Đồng ý</span>
                ),
                cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
              })
                .then(() => {
                  logout(navigate);
                  toast.success('Đăng xuất khỏi website thành công');
                  setIsLoggedIn(false);
                })
                .catch(() => {});
            }}
          >
            Thoát
          </span>
        </div>
        <img src="/settings.svg" alt="" className={cx('admin-navbar__icon')} />
      </div>
    </div>
  );
};

export default AdminNavbar;
