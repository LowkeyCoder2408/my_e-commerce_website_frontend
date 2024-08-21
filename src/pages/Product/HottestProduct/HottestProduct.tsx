import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './HottestProduct.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ProductModel from '../../../models/ProductModel';
import Loader from '../../../utils/Loader';
import { getHottestProducts } from '../../../api/ProductAPI';
import ProductCard from '../ProductCard/ProductCard';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function HottestProduct() {
  const hotProductListRef = useRef<HTMLDivElement>(null);
  const [hottestProducts, setHottestProducts] = useState<ProductModel[]>([]);
  const [productsQuantity, setProductsQuantity] = useState<number>(0);
  const [productsPerRow, setProductsPerRow] = useState<number>(0);
  const [slidesQuantity, setSlidesQuantity] = useState<number>(0);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [translateYValue, setTranslateYValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const responsive = {
    xxl: {
      breakpoint: { max: 4000, min: 1400 },
      items: 6,
    },
    xl: {
      breakpoint: { max: 1400, min: 1200 },
      items: 4,
    },
    lg: {
      breakpoint: { max: 1200, min: 992 },
      items: 4,
    },
    md: {
      breakpoint: { max: 992, min: 768 },
      items: 3,
    },
    sm: {
      breakpoint: { max: 768, min: 576 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 576, min: 0 },
      items: 2,
    },
  };

  useEffect(() => {
    getHottestProducts(12)
      .then((result) => {
        setHottestProducts(result.result);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Lấy danh sách sản phẩm hot không thành công!');
      });
  }, []);

  useEffect(() => {
    if (hotProductListRef.current) {
      const childCount = hottestProducts.length;
      setProductsQuantity(childCount);
    }
  }, [hottestProducts]);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= responsive.xxl.breakpoint.min) {
        setProductsPerRow(responsive.xxl.items);
      } else if (screenWidth >= responsive.xl.breakpoint.min) {
        setProductsPerRow(responsive.xl.items);
      } else if (screenWidth >= responsive.lg.breakpoint.min) {
        setProductsPerRow(responsive.lg.items);
      } else if (screenWidth >= responsive.md.breakpoint.min) {
        setProductsPerRow(responsive.md.items);
      } else if (screenWidth >= responsive.sm.breakpoint.min) {
        setProductsPerRow(responsive.sm.items);
      } else {
        setProductsPerRow(responsive.xs.items);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSlidesQuantity(Math.ceil(productsQuantity / productsPerRow));
  }, [productsQuantity, productsPerRow]);

  const slideHeight = 335;

  const handleNextSlide = () => {
    let newSlideIndex;
    if (slideIndex === slidesQuantity - 1) {
      newSlideIndex = slidesQuantity - 1;
    } else {
      newSlideIndex = slideIndex + 1;
    }
    setSlideIndex(newSlideIndex);
    setTranslateYValue(-newSlideIndex * slideHeight);
  };

  const handlePrevSlide = () => {
    let newSlideIndex;
    if (slideIndex === 0) {
      newSlideIndex = 0;
    } else {
      newSlideIndex = slideIndex - 1;
    }
    setSlideIndex(newSlideIndex);
    setTranslateYValue(-newSlideIndex * slideHeight);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="mb-5" style={{ marginTop: '50px' }}>
        <h2 className={`${cx('hottest-product-title')} mt-5`}>
          <strong>SẢN PHẨM HOT</strong>
          <div className={cx('hottest-product-owl-controls')}>
            <div className={cx('hottest-product-owl-nav')}>
              <div
                onClick={handlePrevSlide}
                className={cx('hottest-product-owl-prev')}
              >
                <FontAwesomeIcon
                  style={{
                    opacity: slideIndex === 0 ? '0.2' : '1',
                    cursor: slideIndex === 0 ? 'default' : 'pointer',
                  }}
                  icon={faArrowUp as IconProp}
                />
              </div>
              <div
                onClick={handleNextSlide}
                className={cx('hottest-product-owl-next')}
              >
                <FontAwesomeIcon
                  style={{
                    opacity: slideIndex === slidesQuantity - 1 ? '0.2' : '1',
                    cursor:
                      slideIndex === slidesQuantity - 1 ? 'default' : 'pointer',
                  }}
                  icon={faArrowDown as IconProp}
                />
              </div>
            </div>
          </div>
        </h2>
        <div className={cx('hottest-product-wrapper')}>
          <div
            ref={hotProductListRef}
            style={{ transform: `translateY(${translateYValue}px)` }}
            className={`${cx('hottest-product-list')} row`}
          >
            {hottestProducts.map((hottestProduct, index) => (
              <div
                key={index}
                className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 col-6"
              >
                <ProductCard key={index} product={hottestProduct} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HottestProduct;
