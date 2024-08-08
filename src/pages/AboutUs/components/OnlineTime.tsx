import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../scss/OnlineTime.module.scss';
import {
  faClock,
  faCreditCard,
  faEnvelope,
} from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function OnlineTime() {
  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <h2 className="my-3">
        <strong>KẾT NỐI CÙNG TECH HUB</strong>
      </h2>
      <div className={`${cx('online-time__wrapper')} row mt-5`}>
        <div
          className={`${cx('online-time__item')} mt-5 col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12`}
        >
          <h3>
            <FontAwesomeIcon icon={faPhone as IconProp} />
            <strong>Số điện thoại</strong>
          </h3>
          <div className={cx('online-time__item-list')}>
            <h3>033.2426.055 (Mr. Lam)</h3>
            <h3>034.9651.976 (Ms. Mai)</h3>
          </div>
        </div>
        <div
          className={`${cx('online-time__item')} mt-5 col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12`}
        >
          <h3>
            <FontAwesomeIcon icon={faClock as IconProp} />
            <strong>Giờ hoạt động</strong>
          </h3>
          <div className={cx('online-time__item-list')}>
            <h3>Thứ hai - Thứ sáu: 8AM - 9PM</h3>
            <h3>Thứ bảy - Chủ nhật: 9AM - 10PM</h3>
          </div>
        </div>
        <div
          className={`${cx('online-time__item')} mt-5 col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12`}
        >
          <h3>
            <FontAwesomeIcon icon={faCreditCard as IconProp} />
            <strong>Số tài khoản</strong>
          </h3>
          <div className={cx('online-time__item-list')}>
            <h3>Agribank: 6618281001189</h3>
            <h3>Vietcombank: 1025193137</h3>
          </div>
        </div>
        <div
          className={`${cx('online-time__item')} mt-5 col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12`}
        >
          <h3>
            <FontAwesomeIcon icon={faEnvelope as IconProp} />
            <strong>Email</strong>
          </h3>
          <div className={cx('online-time__item-list')}>
            <h3>21h1120042@ut.edu.vn</h3>
            <h3>belamdepzai@gmail.com</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlineTime;
