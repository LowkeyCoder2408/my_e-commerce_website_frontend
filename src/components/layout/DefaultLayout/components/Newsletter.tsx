import { Link } from 'react-router-dom';
import styles from './scss/Newsletter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Newsletter() {
  return (
    <div className="container-fluid bg-white p-0">
      <div className="container">
        <div className={cx('newsletter-group')}>
          <div className="row">
            <div
              className={`${cx('newsletter-title')} col-xxl-4 col-xl-4 col-lg-6 col-12 text-center`}
            >
              <span>
                <strong>ĐĂNG KÝ ĐỂ NHẬN THÔNG BÁO</strong>
              </span>
              <p>Hãy là người đầu tiên nhận bản tin ngay hôm nay</p>
            </div>
            <div
              className={`${cx('newsletter-send')} col-xxl-5 col-xl-5 col-lg-6 col-12 d-flex align-items-center`}
            >
              <div className={`${cx('input-height-100')} input-group`}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vui lòng nhập email của bạn..."
                  aria-label="Vui lòng nhập email của bạn..."
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-addon2"
                >
                  <h4 className="m-0">Đăng ký</h4>
                </button>
              </div>
            </div>
            <div
              className={`${cx('link-follow')} col-xxl-3 col-xl-3 col-lg-12 col-12 d-flex justify-content-center align-items-center`}
            >
              <Link to={''}>
                <FontAwesomeIcon icon={faFacebookF as IconProp} />
              </Link>
              <Link to={''}>
                <FontAwesomeIcon icon={faXTwitter as IconProp} />
              </Link>
              <Link to={''}>
                <FontAwesomeIcon icon={faInstagram as IconProp} />
              </Link>
              <Link to={''}>
                <FontAwesomeIcon icon={faLinkedinIn as IconProp} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
