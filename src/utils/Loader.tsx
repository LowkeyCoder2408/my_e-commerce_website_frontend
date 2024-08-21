import classNames from 'classnames/bind';
import styles from './scss/Loader.module.scss';

const cx = classNames.bind(styles);

function Loader() {
  return (
    <div className={cx('loader-container')}>
      <div className={cx('loader')}></div>
      <p>Đang tải dữ liệu...</p>
    </div>
  );
}

export default Loader;
