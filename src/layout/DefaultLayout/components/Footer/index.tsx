import "./Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FaFacebookF, FaGoogle, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div className="container-fluid bg-dark pt-5">
      <div className="container">
        <footer className="text-center text-lg-start text-white">
          <div className="container p-0">
            {/* Section: Links */}
            <section className="">
              {/*Grid row*/}
              <div className="row">
                {/* Grid column */}
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <h4 className="text-uppercase mt-2 mb-5 text-center font-weight-600">
                    Chi nhánh của Tech hub
                  </h4>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 px-5">
                      <p className="">
                        <strong>CƠ SỞ CHÍNH:</strong> Số 249, Đinh Bộ Lĩnh, P.
                        26, Q. Bình Thạnh, TP. Hồ Chí Minh
                      </p>
                      <div className="my-4">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.747226401033!2d106.7090133116459!3d10.81216050262843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752897cbedf7fd%3A0x7d3d67adb962dd1e!2zMjQ5IMSQLiDEkGluaCBC4buZIEzEqW5oLCBQaMaw4budbmcgMjYsIELDrG5oIFRo4bqhbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1696696631373!5m2!1svi!2s"
                          width="100%"
                          height="280px"
                          style={{ border: "none" }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded"
                        ></iframe>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 px-5">
                      <p className="">
                        <strong>CHI NHÁNH 1:</strong> Số 02, Võ Oanh, P. 25, Q.
                        Bình Thạnh, TP. Hồ Chí Minh
                      </p>
                      <div className="my-4">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0886458054174!2d106.71422577481859!3d10.804522458675308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293dceb22197%3A0x755bb0f39a48d4a6!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1696743024020!5m2!1svi!2s"
                          width="100%"
                          height="280px"
                          style={{ border: "none" }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Grid column */}

                <hr className="w-100 clearfix d-md-none" />
                <div className="my-4 col-xl-3 col-lg-4 col-md-4">
                  <h4 className="text-uppercase mb-4 font-weight-600">
                    Chăm sóc khách hàng
                  </h4>
                  <a className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Hướng dẫn mua hàng
                    </p>
                  </a>
                  <a className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Hướng dẫn thanh toán
                    </p>
                  </a>
                  <a className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Hướng dẫn đổi/trả hàng
                    </p>
                  </a>
                  <Link to={"/faq"} className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Hỏi & đáp
                    </p>
                  </Link>
                </div>
                {/* Grid column */}

                <hr className="w-100 clearfix d-md-none" />

                {/* Grid column */}
                <div className="my-4 col-xl-3 col-lg-4 col-md-4">
                  <h4 className="text-uppercase mb-4 font-weight-600">
                    Về chúng tôi
                  </h4>
                  <Link to={"/about-us"} className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Những điều cơ bản mà bạn cần biết?
                    </p>
                  </Link>
                  <a className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Điều khoản Tech Hub
                    </p>
                  </a>
                  <Link to={"/contact"} className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Liên hệ với Tech Hub
                    </p>
                  </Link>
                  <a className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Phản hồi về Tech Hub
                    </p>
                  </a>
                </div>

                {/* Grid column */}
                <hr className="w-100 clearfix d-md-none" />

                {/* Grid column */}
                <div className="my-4 col-xl-3 col-lg-4 col-md-4">
                  <h4 className="text-uppercase mb-4 font-weight-600">
                    Các chính sách và phúc lợi
                  </h4>
                  <Link
                    to={"/exchange-return-refund-policy"}
                    className="text-white"
                  >
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Chính sách đổi/trả/hoàn tiền
                    </p>
                  </Link>
                  <Link to={"/warranty-policy"} className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Chính sách bảo hành
                    </p>
                  </Link>
                  <Link to={"/shipping-policy"} className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Chính sách vận chuyển
                    </p>
                  </Link>
                  <Link to={"/security-policy"} className="text-white">
                    <p
                      className="footer-link"
                      style={{ color: "rgba(255, 255, 255, .5)" }}
                    >
                      Chính sách bảo mật
                    </p>
                  </Link>
                </div>

                {/* Grid column */}
                <hr className="w-100 clearfix d-md-none" />

                {/* Grid column */}
                <div className="my-4 col-xl-3 col-lg-12 col-md-12 d-flex justify-content-center flex-column">
                  <h4
                    className="text-uppercase mb-4 font-weight-600 text-center"
                    style={{ lineHeight: "25px" }}
                  >
                    Đăng ký ngay để nhận thông báo từ chúng tôi
                  </h4>
                  <form className="form-inline my-2 my-lg-0 d-flex gap-3">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Nhập email của bạn..."
                      style={{ fontSize: "13px" }}
                    />
                    <button
                      style={{ width: "60px", height: "32px" }}
                      className="btn btn-secondary"
                      type="submit"
                    >
                      <FontAwesomeIcon
                        icon={faPaperPlane as IconProp}
                      ></FontAwesomeIcon>
                    </button>
                  </form>
                </div>
                {/* Grid column */}
              </div>
              {/*Grid row*/}
            </section>
            {/* Section: Links */}

            <hr className="my-3" />

            {/* Section: Copyright */}
            <section className="pb-3">
              <div className="row d-flex align-items-center">
                {/* Grid column */}
                <div className="col-md-7 col-lg-8 text-center text-md-start">
                  {/* Copyright */}
                  <div className="py-3">
                    © 2024 Copyright:
                    <Link
                      style={{ fontWeight: "700" }}
                      className="text-white"
                      to={"/"}
                    >
                      {" "}
                      TECH HUB
                    </Link>
                  </div>
                  {/* Copyright */}
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                  <a
                    className="btn btn-outline-light btn-floating m-1 text-white"
                    role="button"
                    style={{ width: "25px", height: "25px" }}
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    className="btn btn-outline-light btn-floating m-1 text-white"
                    role="button"
                    style={{ width: "25px", height: "25px" }}
                  >
                    <FaTwitter />
                  </a>
                  <a
                    className="btn btn-outline-light btn-floating m-1 text-white"
                    role="button"
                    style={{ width: "25px", height: "25px" }}
                  >
                    <FaInstagram />
                  </a>
                  <a
                    className="btn btn-outline-light btn-floating m-1 text-white"
                    role="button"
                    style={{ width: "25px", height: "25px" }}
                  >
                    <FaGoogle />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
