import classNames from 'classnames/bind';
import styles from './scss/Loader.module.scss';

const cx = classNames.bind(styles);

interface LoaderProps {
  isAdmin?: boolean;
}

function Loader(props: LoaderProps) {
  return (
    <div className={cx('loader-container')}>
      <div className={cx('loader', { 'white-text': props.isAdmin })}></div>
      <p className={cx({ 'white-text': props.isAdmin })}>Đang tải dữ liệu...</p>
    </div>
  );
}

export default Loader;
