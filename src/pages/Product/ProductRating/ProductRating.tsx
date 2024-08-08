import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './ProductRating.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ProductRatingProps {
  rating: number;
}

const ProductRating: React.FC<ProductRatingProps> = (
  props: ProductRatingProps,
) => {
  return (
    <div className={cx('product-details__rating')}>
      {props.rating !== undefined && props.rating > 0 && (
        <>
          {[...Array(Math.floor(props.rating))].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar as IconProp}
              style={{
                color: '#f5c31a',
              }}
            />
          ))}
          {props.rating % 1 >= 0.5 && props.rating % 1 < 1 && (
            <FontAwesomeIcon
              icon={faStarHalfStroke as IconProp}
              style={{
                color: '#f5c31a',
              }}
            />
          )}
        </>
      )}
      {(props.rating === undefined || props.rating == 0) && (
        <div className={cx('product-details__no-rating')}>Chưa có đánh giá</div>
      )}
    </div>
  );
};

export default ProductRating;
