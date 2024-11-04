import styles from './scss/Contact.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Contact = () => {
  return (
    <div className="container">
      <div className={`${cx('contact')} border bg-light`}>
        <div className={`${cx('contact__action')}`}>
          <div className={`${cx('contact__question')}`}>
            <div className="default-title">CÂU HỎI PHẢN HỒI VỀ TECH HUB</div>
            <form className={`${cx('question__form')} row`} autoComplete="off">
              <div className="col col-xxl-6 col-xl-6 col-lg-6 col-12">
                <label htmlFor={cx('question-form__name')}>
                  Họ và tên (Có thể nhập nickname) *
                </label>
                <input
                  type="text"
                  name="name"
                  id="question-form__name"
                  className={cx('question-form__field')}
                  placeholder="Vui lòng nhập tên đầy đủ..."
                  required
                />
              </div>
              <div className="col col-xxl-6 col-xl-6 col-lg-6 col-12">
                <label htmlFor="question-form__email">Email của bạn *</label>
                <input
                  type="email"
                  name="email"
                  id="question-form__email"
                  className={cx('question-form__field')}
                  placeholder="Nhập email..."
                  required
                />
              </div>
              <div className="col col-12">
                <label htmlFor="question-form__question">
                  Nội dung phản hồi *
                </label>
                <textarea
                  name="question"
                  id="question-form__question"
                  className={cx('question-form__field')}
                  cols={40}
                  rows={4}
                  placeholder="Nhập nội dung liên hệ..."
                ></textarea>
              </div>
              <div
                className="col col-xxl-12"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <button
                  type="submit"
                  className={`${cx('question-form__btn')} btn btn-dark`}
                >
                  GỬI PHẢN HỒI CHO TECH HUB
                </button>
              </div>
            </form>
          </div>
          <div className={`${cx('contact__map')} mt-5`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0887145900892!2d106.71422577487016!3d10.80451718934594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293dceb22197%3A0x755bb0f39a48d4a6!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggLSBDxqEgc-G7nyAx!5e0!3m2!1svi!2sus!4v1697817013166!5m2!1svi!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
