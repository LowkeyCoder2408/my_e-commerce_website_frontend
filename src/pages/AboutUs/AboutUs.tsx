import { Link } from 'react-router-dom';
import styles from './scss/AboutUs.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AboutUs() {
  return (
    <div className="container mt-5">
      <div className="container p-0">
        <section className={`${cx('about-us__section')} py-3 py-md-5`}>
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 col-lg-6 col-xl-5">
              <img
                className={`${cx('leftTo-15')} img-fluid rounded`}
                loading="lazy"
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708439167/about_1_z2rk3g.png"
                alt="About 1"
              />
            </div>
            <div className="col-12 col-lg-6 col-xl-7">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-12">
                  <h2 className={`${cx('about-us__title', 'rightTo-8')} mb-3`}>
                    Tech Hub là gì?
                  </h2>
                  <p
                    className={`${cx('about-us__sub-title', 'rightTo-13')} lead fs-4 text-secondary mb-3`}
                  >
                    Tech Hub là điểm đến hàng đầu cho những người đam mê công
                    nghệ và đam mê sáng tạo. Chúng tôi là một cửa hàng trực
                    tuyến chuyên cung cấp các sản phẩm công nghệ hàng đầu, từ
                    điện thoại thông minh, laptop, máy tính bảng đến các phụ
                    kiện điện tử và thiết bị gia dụng thông minh.
                  </p>
                  <p
                    className={`${cx('about-us__sub-description', 'rightTo-18')} mb-5`}
                  >
                    Với cam kết mang lại sự tiện lợi, chất lượng và độ tin cậy
                    cao nhất, Tech Hub không chỉ là một nơi mua sắm, mà còn là
                    người bạn đồng hành đáng tin cậy cho mọi người trong hành
                    trình khám phá công nghệ mới. Với đội ngũ nhân viên giàu
                    kinh nghiệm và niềm đam mê không ngừng, chúng tôi cam kết
                    mang đến trải nghiệm mua sắm trực tuyến tuyệt vời nhất cho
                    mỗi khách hàng, giúp họ khám phá và tận hưởng những tiện ích
                    tối ưu của công nghệ hiện đại.
                  </p>
                  <div
                    className={`${cx('about-us__prize')} row gy-4 gy-md-0 gx-xxl-5X`}
                  >
                    <div className="col-12 col-md-6">
                      <div className="d-flex">
                        <div className="me-4 text-dark">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-gear-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                          </svg>
                        </div>
                        <div className="">
                          <h2 className="h4 mb-3">Thương hiệu đa năng</h2>
                          <p className="text-secondary mb-0">
                            Chúng tôi đang tạo ra một loạt các thiết bị công
                            nghệ tồn tại trong cuộc sống trên mọi phương tiện.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="d-flex">
                        <div className="me-4 text-dark">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-fire"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                          </svg>
                        </div>
                        <div className="">
                          <h2 className="h4 mb-3">Đại lý kỹ thuật số</h2>
                          <p className="text-secondary mb-0">
                            Chúng tôi tin vào sự đổi mới bằng cách kết hợp những
                            ý tưởng cơ bản với những ý tưởng phức tạp.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${cx('about-us__section')} py-3 py-md-5`}>
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 col-lg-6">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-12">
                  <h2 className={`${cx('about-us__title', 'leftTo-8')} mb-3`}>
                    Tại sao nên chọn Tech Hub?
                  </h2>
                  <p
                    className={`${cx('about-us__sub-title', 'leftTo-13')} lead fs-4 mb-3 mb-xl-5`}
                  >
                    Bạn đang tìm kiếm một địa chỉ đáng tin cậy để mua sắm các
                    sản phẩm công nghệ hàng đầu? Hãy để chúng tôi giới thiệu về
                    Tech Hub và lý do tại sao chúng tôi là lựa chọn tuyệt vời
                    cho bạn.
                  </p>
                  <div
                    className={`${cx('leftTo-18')} d-flex align-items-center mb-3`}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`${cx('about-us__sub-description')} fs-5 m-0`}
                      >
                        Đa dạng sản phẩm
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${cx('leftTo-19')} d-flex align-items-center mb-3`}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`${cx('about-us__sub-description')} fs-5 m-0`}
                      >
                        Chất lượng đảm bảo
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${cx('leftTo-20')} d-flex align-items-center mb-3`}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`${cx('about-us__sub-description')} fs-5 m-0`}
                      >
                        Giá cả cạnh tranh
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${cx('leftTo-21')} d-flex align-items-center mb-3`}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`${cx('about-us__sub-description')} fs-5 m-0`}
                      >
                        Thanh toán và vận chuyển thuận tiện
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${cx('leftTo-22')} d-flex align-items-center mb-4 mb-xl-5`}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`${cx('about-us__sub-description')} fs-5 m-0`}
                      >
                        Dịch vụ khách hàng xuất sắc
                      </p>
                    </div>
                  </div>
                  <Link to={'/product-list'}>
                    <button
                      type="button"
                      className={`${cx('leftTo-25')} btn btn-dark`}
                      style={{
                        float: 'right',
                        height: '40px',
                        width: '140px',
                        fontSize: '1.5rem',
                      }}
                    >
                      Khám phá ngay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <img
                className={`${cx('rightTo-15')} img-fluid rounded`}
                loading="lazy"
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708439344/about_2_apkze5.png"
                alt="About 2"
              />
            </div>
          </div>
        </section>
        <section>
          <h1 className={cx('title')}>THÀNH VIÊN LÃNH ĐẠO TECH HUB</h1>
          <div className={cx('team-row')}>
            <div className={cx('member')}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                alt=""
              />
              <h2>Bà. Nguyễn Thúc Thùy Tiên</h2>
              <p>Nhà sáng lập Tech Hub</p>
            </div>
            <div className={cx('member')}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102717/Testinomial_3_gw76vg.png"
                alt=""
              />
              <h2>Ông. Đỗ Kim Lâm</h2>
              <p>Đồng sáng lập, nguyên chủ tịch</p>
            </div>
            <div className={cx('member')}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102715/Testinomial_1_bvftan.jpg"
                alt=""
              />
              <h2>Ông. Huỳnh Trấn Thành</h2>
              <p>Đại cổ đông</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
