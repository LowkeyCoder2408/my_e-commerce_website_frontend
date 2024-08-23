import classNames from 'classnames/bind';
import styles from '../scss/Service.module.scss';

const cx = classNames.bind(styles);

function Service() {
  return (
    <div className="container">
      <div className={`${cx('service__wrapper')} my-5`}>
        <div className="default-title">DỊCH VỤ CỦA TECH HUB</div>
        <div className={`${cx('service__list')} row mt-5`}>
          <div
            className={`${cx('service__item-wrapper')} col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12`}
          >
            <div className={`${cx('service__item')} d-flex align-items-center`}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708009709/service_1_ubviw3.png"
                alt="Dịch vụ"
              />
              <div className={cx('service__item-description')}>
                <h4>
                  <strong>Miễn phí ship</strong>
                </h4>
                <p className="mb-0">Đối với hóa đơn từ 5 triệu</p>
              </div>
            </div>
          </div>
          <div
            className={`${cx('service__item-wrapper')} col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12`}
          >
            <div className={`${cx('service__item')} d-flex align-items-center`}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708009709/service_2_tytqwi.png"
                alt="Dịch vụ"
              />
              <div className={cx('service__item-description')}>
                <h4>
                  <strong>Ưu đãi bất ngờ mỗi ngày</strong>
                </h4>
                <p className="mb-0">Lên đến 50%</p>
              </div>
            </div>
          </div>
          <div
            className={`${cx('service__item-wrapper')} col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12`}
          >
            <div className={`${cx('service__item')} d-flex align-items-center`}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708009710/service_3_ksj9vr.png"
                alt="Dịch vụ"
              />
              <div className={cx('service__item-description')}>
                <h4>
                  <strong>Hỗ trợ 24/7</strong>
                </h4>
                <p className="mb-0">Bởi các chuyên viên Tech Hub</p>
              </div>
            </div>
          </div>
          <div
            className={`${cx('service__item-wrapper')} col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12`}
          >
            <div className={`${cx('service__item')} d-flex align-items-center`}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708009710/service_4_umn06b.png"
                alt="Dịch vụ"
              />
              <div className={cx('service__item-description')}>
                <h4>
                  <strong>Cam kết giá cả</strong>
                </h4>
                <p className="mb-0">Hợp lý, đúng giá niêm yết</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
