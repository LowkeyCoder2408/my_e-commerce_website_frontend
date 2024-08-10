import classNames from 'classnames/bind';
import styles from './Exception.module.scss';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const Error403 = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div id={cx('error-page')}>
      <div className={cx('content')}>
        <h2 className={cx('header')} data-text="403">
          403
        </h2>
        <h4 data-text="Opps! Bạn không có quyền truy cập vào trang này!">
          Opps! Bạn không có quyền truy cập vào trang này!
        </h4>
        <p>
          Trang này chỉ được phép truy cập khi bạn có vai trò là quản trị viên!
        </p>
        {!isAdminPath && (
          <div className={cx('btns')}>
            <Link to={'/'}>về trang chủ</Link>
          </div>
        )}
        {isAdminPath && (
          <div className={cx('btns')}>
            <Link to={'/admin/dashboard'}>về trang chủ</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error403;
