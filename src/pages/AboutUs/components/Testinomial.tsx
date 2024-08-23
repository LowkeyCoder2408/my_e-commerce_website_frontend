import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../scss/Testinomial.module.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Testinomial() {
  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <div className="default-title">KHÁCH HÀNG NÓI GÌ VỀ TECH HUB?</div>
      <div className={`${cx('testimonial__wrapper')} my-5`}>
        <div className={cx('testimonial__box')}>
          <i className={`${cx('quote')} fas fa-quote-left`}></i>
          <p>
            Sự đa dạng về sản phẩm giống như sự đa tài trên sân cỏ. Thời gian
            giao hàng nhanh như gia tốc chạy của tôi, và chất lượng sản phẩm như
            những đường chuyền chính xác. Đó là một đối tác mua sắm ưu việt,
            giống như mối liên kết giữa các cầu thủ trên sân!
          </p>
          <div className={cx('testimonial__content')}>
            <div className={cx('info')}>
              <div className={cx('name')}>Lionel Andrés Messi</div>
              <div className={cx('job')}>Siêu sao | Cầu thủ</div>
              <div className={cx('stars')}>
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
              </div>
            </div>
            <div className={cx('testimonial__image')}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102717/Testinomial_3_gw76vg.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={cx('testimonial__box')}>
          <i className={`${cx('quote')} fas fa-quote-left`}></i>
          <p>
            Amazing gút chóp. Thật sự ấn tượng với sự đa dạng của dịch vụ chăm
            sóc khách hàng. Giao diện trang web dễ sử dụng, giúp tôi nhanh chóng
            tìm kiếm và có thông tin chi tiết về sản phẩm. Sự hỗ trợ nhanh nhạy
            giúp tạo nên trải nghiệm mua sắm tuyệt vời.
          </p>
          <div className={cx('testimonial__content')}>
            <div className={cx('info')}>
              <div className={cx('name')}>Huỳnh Trấn Thành</div>
              <div className={cx('job')}>Đạo diễn | Diễn viên</div>
              <div className={cx('stars')}>
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
              </div>
            </div>
            <div className={cx('testimonial__image')}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102715/Testinomial_1_bvftan.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={cx('testimonial__box')}>
          <i className={`${cx('quote')} fas fa-quote-left`}></i>
          <p>
            Sản phẩm tại Tech Hub vô cùng ấn tượng! Chất lượng giao hàng xuất
            sắc, đóng gói cẩn thận, và thời gian giao hàng nhanh chóng. Tôi rất
            hài lòng với trải nghiệm mua sắm của mình. Đây là địa chỉ đáng tin
            cậy cho những nhu cầu mua sắm trực tuyến!
          </p>
          <div className={cx('testimonial__content')}>
            <div className={cx('info')}>
              <div className={cx('name')}>Nguyễn Thúc Thùy Tiên</div>
              <div className={cx('job')}>Youtuber | Người mẫu</div>
              <div className={cx('stars')}>
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
              </div>
            </div>
            <div className={cx('testimonial__image')}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testinomial;
