import { useState, useEffect } from 'react';
import styles from './scss/DealProduct.module.scss';
import ProductItem from './components/DealProductItem';
import { toast } from 'react-toastify';
import BestSellingProduct from './components/BestSellingProduct';
import ProductModel from '../../../models/ProductModel';
import { getDealProducts, getTopSoldProducts } from '../../../api/ProductAPI';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DealProduct = () => {
  const [dealProductList, setDealProductList] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [topSoldProductList, setTopSoldProductList] = useState<ProductModel[]>(
    [],
  );

  useEffect(() => {
    Promise.all([getDealProducts(4), getTopSoldProducts(6)])
      .then(([dealResult, topSoldResult]) => {
        setDealProductList(dealResult);
        setTopSoldProductList(topSoldResult.result);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Đã xảy ra lỗi khi lấy dữ liệu!');
      });
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const daysUntilNextSunday = currentDay === 0 ? 7 : 7 - currentDay;
    const nextSunday = new Date(currentDate);
    nextSunday.setDate(currentDate.getDate() + daysUntilNextSunday);

    const sundayDate = nextSunday.getDate();
    const sundayMonth = nextSunday.getMonth() + 1;
    const sundayYear = nextSunday.getFullYear();

    const sundayDateString = `${sundayDate}-${sundayMonth}-${sundayYear}`;
    const countdownElement = document.getElementById('countdowntimer');

    if (!countdownElement) {
      console.error('countdownElement is null');
      return;
    }

    countdownElement.setAttribute('data-date', sundayDateString);
    const dateString = countdownElement.getAttribute('data-date');
    const timeString = countdownElement.getAttribute('data-time');

    // Chuyển đổi dateString và timeString thành một đối tượng Date hợp lệ
    const [day, month, year] = dateString?.split('-') || ['0', '0', '0'];
    const [hour, minute] = timeString?.split(':') || ['0', '0'];
    const yearNumber = parseInt(year, 10);
    const monthNumber = parseInt(month, 10) - 1;
    const dayNumber = parseInt(day, 10);
    const hourNumber = parseInt(hour, 10);
    const minuteNumber = parseInt(minute, 10);

    const targetDate = new Date(
      yearNumber,
      monthNumber,
      dayNumber,
      hourNumber,
      minuteNumber,
    ).getTime();

    const updateCountdown = () => {
      const countdownElement = document.getElementById('countdowntimer');
      if (!countdownElement) {
        console.error('countdownElement is null');
        return;
      }
      const currentDate = new Date().getTime();
      const difference = targetDate - currentDate;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const dayElement = countdownElement.querySelector('.day .num');
      const hourElement = countdownElement.querySelector('.hour .num');
      const minElement = countdownElement.querySelector('.min .num');
      const secElement = countdownElement.querySelector('.sec .num');

      if (dayElement && hourElement && minElement && secElement) {
        dayElement.textContent = days.toString();
        hourElement.textContent = hours.toString().padStart(2, '0');
        minElement.textContent = minutes.toString().padStart(2, '0');
        secElement.textContent = seconds.toString().padStart(2, '0');
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className={`${cx('deals')} col-xxl-9 col-lg-8 col-sm-12 mt-3`}>
          <div className={cx('deals__header')}>
            <h1 className={cx('deals__title')}>Siêu sale trong tuần</h1>
          </div>
          <div className={`${cx('deals__body')} bg-white border`}>
            <div
              data-time="00:00"
              className={cx('deals__countdown')}
              id="countdowntimer"
            >
              <div className={cx('deals__countdown-title')}>Kết thúc sau:</div>
              <div className={`${cx('deals__countdown-item')} day`}>
                <span className={cx('num')}>0</span>
                <span className={cx('word')}>Ngày</span>
              </div>
              <div className={`${cx('deals__countdown-item')} hour`}>
                <span className={cx('num')}>0</span>
                <span className={cx('word')}>Giờ</span>
              </div>
              <div className={`${cx('deals__countdown-item')} min`}>
                <span className={cx('num')}>0</span>
                <span className={cx('word')}>Phút</span>
              </div>
              <div className={`${cx('deals__countdown-item')} sec`}>
                <span className={cx('num')}>0</span>
                <span className={cx('word')}>Giây</span>
              </div>
            </div>
            <div className={`${cx('deals__list')} row`}>
              {dealProductList.map((product) => (
                <div
                  key={product.id}
                  className="col col-xxl-6 col-xl-6 col-lg-6 col-12"
                >
                  <ProductItem key={product.id} product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`${cx('top-selling')} col-xxl-3 col-lg-4 col-sm-12 mt-3`}
        >
          <div className={cx('top-selling__header')}>
            <h1 className={cx('top-selling__title')}>BÁN CHẠY NHẤT</h1>
          </div>
          <div className={`${cx('top-selling__list')} bg-white`}>
            {topSoldProductList.map((brand) => (
              <BestSellingProduct key={brand.id} product={brand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealProduct;
