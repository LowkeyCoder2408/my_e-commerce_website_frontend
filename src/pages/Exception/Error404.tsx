import classNames from 'classnames/bind';
import styles from './Exception.module.scss';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const Error404 = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div id={cx('error-page')}>
      <div className={cx('content')}>
        <h2 className={cx('header')} data-text="404">
          404
        </h2>
        <h4 data-text="Opps! Trang không tồn tại">Opps! Trang không tồn tại</h4>
        <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
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

export default Error404;
