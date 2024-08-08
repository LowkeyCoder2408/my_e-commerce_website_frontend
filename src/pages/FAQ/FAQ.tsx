import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FAQ.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function FAQ() {
  const [activePanel, setActivePanel] = useState<number>(-1);

  const togglePanel = (index: number) => {
    setActivePanel(activePanel === index ? -1 : index);
  };

  return (
    <div className="container">
      <div className={`${cx('faq__wrapper')} mt-5 bg-white border`}>
        <div className={cx('faq__content')}>
          <div className="row">
            <div className="col-xxl-6 d-flex flex-column justify-content-center">
              <h1 className={cx('faq__title')}>CÁC CÂU HỎI THƯỜNG GẶP</h1>
              <h4 className={cx('faq__sub-title')}>
                <strong>Bạn có câu hỏi? Chúng tôi có câu trả lời!</strong> Đặt
                bất kỳ câu hỏi nào liên quan đến sản phẩm, dịch vụ, hoặc bất kỳ
                chủ đề nào khác bạn quan tâm. Chúng tôi ở đây để hỗ trợ bạn và
                giải quyết mọi thắc mắc.
              </h4>
            </div>
            <div className="col-xxl-6">
              <div className={cx('faq', { active: activePanel === 0 })}>
                {/* // here */}
                <div className={cx('accordion')} onClick={() => togglePanel(0)}>
                  Tại sao bạn cần một trang "Hỏi & đáp"?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 0
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Trang "Hỏi & đáp" giúp tiết kiệm thời gian cho cả khách hàng
                    và doanh nghiệp, giảm số lượng cuộc gọi hỗ trợ, tăng tính
                    tương tác, và xây dựng lòng tin qua việc cung cấp thông tin
                    chi tiết và dễ tiếp cận.
                  </p>
                </div>
              </div>
              <div className={cx('faq', { active: activePanel === 1 })}>
                <div className={cx('accordion')} onClick={() => togglePanel(1)}>
                  Nó có cải thiện trải nghiệm người dùng không?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 1
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Có, trang FAQ cải thiện trải nghiệm người dùng bằng cách
                    tiết kiệm thời gian, tăng tính tự phục vụ, và tạo lòng tin
                    thông qua việc cung cấp thông tin chi tiết và dễ tiếp cận.
                  </p>
                </div>
              </div>
              <div className={cx('faq', { active: activePanel === 2 })}>
                <div className={cx('accordion')} onClick={() => togglePanel(2)}>
                  Thanh toán đơn hàng bằng cách nào?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 2
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Để thanh toán đơn hàng của bạn, chọn sản phẩm, kiểm tra giỏ
                    hàng, chọn phương thức thanh toán (thẻ tín dụng, chuyển
                    khoản, ví điện tử, vv.), nhập thông tin thanh toán, xác nhận
                    đơn hàng, và hoàn tất thanh toán.
                  </p>
                </div>
              </div>
              <div className={cx('faq', { active: activePanel === 3 })}>
                <div className={cx('accordion')} onClick={() => togglePanel(3)}>
                  Tôi có thể theo dõi đơn hàng hay không?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 3
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Có, bạn có thể theo dõi đơn hàng của mình bằng cách đăng
                    nhập vào tài khoản và truy cập mục "Theo dõi đơn hàng" hoặc
                    sử dụng mã theo dõi được cung cấp trong email xác nhận đơn
                    hàng.
                  </p>
                </div>
              </div>
              <div className={cx('faq', { active: activePanel === 4 })}>
                <div className={cx('accordion')} onClick={() => togglePanel(4)}>
                  Làm cách nào để thay đổi thứ gì đó trong đơn hàng của tôi?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 4
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Để thay đổi điều gì đó trong đơn hàng, vui lòng liên hệ ngay
                    với dịch vụ khách hàng của chúng tôi qua số điện thoại hoặc
                    email để được hỗ trợ. Chúng tôi luôn thường trực 24/24.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${cx('faq__wrapper')} mt-5 bg-white border`}>
        <div className={cx('faq__content')}>
          <div className="row">
            <div className="col-xxl-6 d-flex flex-column justify-content-center">
              <h1 className={cx('faq__title')}>
                CÁC CÂU HỎI MỞ RỘNG, CHUYÊN MÔN
              </h1>
              <h4 className={cx('faq__sub-title')}>
                Được thiết kế để cung cấp thông tin chi tiết và chuyên sâu về
                các vấn đề kỹ thuật, sản phẩm cụ thể hoặc các chủ đề chuyên
                ngành, phần này cung cấp câu trả lời đầy đủ và chi tiết cho
                những câu hỏi phức tạp và cụ thể hơn.
              </h4>
            </div>
            <div className="col-xxl-6">
              <div className={cx('faq', { active: activePanel === 5 })}>
                <div className={cx('accordion')} onClick={() => togglePanel(5)}>
                  Làm thế nào sản phẩm A so với sản phẩm B về hiệu suất?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 5
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Sản phẩm A có hiệu suất cao hơn với chip mới nhất và dung
                    lượng pin lớn hơn so với sản phẩm B. Nếu bạn cần hiệu suất
                    tối đa, sản phẩm A là sự lựa chọn tốt nhất.
                  </p>
                </div>
              </div>
              <div className={cx('faq', { active: activePanel === 6 })}>
                <div className={cx('accordion')} onClick={() => togglePanel(6)}>
                  Có chương trình ưu đãi dành cho khách hàng thân thiết không?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 6
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Chắc chắn! Chúng tôi có chương trình thành viên đặc biệt với
                    ưu đãi và giảm giá riêng cho khách hàng thân thiết. Bạn có
                    thể đăng ký ngay từ trang chủ để nhận những ưu đãi này.
                  </p>
                </div>
              </div>
              <div className={cx('faq', { active: activePanel === 7 })}>
                <div className={cx('accordion')} onClick={() => togglePanel(7)}>
                  Nếu sản phẩm có vấn đề kỹ thuật, quy trình bảo hành ra sao?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 7
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Nếu bạn gặp vấn đề, xin vui lòng liên hệ với bộ phận hỗ trợ
                    của chúng tôi qua số điện thoại hoặc email. Chúng tôi sẽ hỗ
                    trợ bạn qua quy trình bảo hành và sửa chữa một cách nhanh
                    chóng.
                  </p>
                </div>
              </div>
              <div className={cx('faq', { active: activePanel === 8 })}>
                <div className={cx('accordion')} onClick={() => togglePanel(8)}>
                  Làm thế nào để theo dõi gói hàng của tôi trong thời gian thực?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 8
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Khi đơn hàng của bạn được gửi, bạn sẽ nhận được email theo
                    dõi với liên kết cập nhật trạng thái giao hàng. Bạn có thể
                    theo dõi gói hàng của mình trực tuyến.
                  </p>
                </div>
              </div>
              <div className={cx('faq', { active: activePanel === 9 })}>
                <div className={cx('accordion')} onClick={() => togglePanel(9)}>
                  Làm thế nào để đánh giá sản phẩm sau khi tôi sử dụng nó?
                  <FontAwesomeIcon
                    icon={
                      activePanel === 9
                        ? (faMinus as IconProp)
                        : (faPlus as IconProp)
                    }
                  />
                </div>
                <div className={cx('panel')}>
                  <p className="m-0">
                    Chúng tôi rất hoan nghênh đánh giá của bạn! Sau khi mua
                    hàng, bạn sẽ nhận được một email mời bạn đánh giá sản phẩm.
                    Ý kiến của bạn quan trọng đối với chúng tôi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
