import classNames from 'classnames/bind';
import ProductModel from '../../../../models/ProductModel';
import styles from '../scss/BestSellingProduct.module.scss';
import { Link } from 'react-router-dom';
import ProductRating from '../../ProductRating/ProductRating';

const cx = classNames.bind(styles);

interface BestSellingProductProps {
  product: ProductModel;
}

const BestSellingProduct = (props: BestSellingProductProps) => {
  const percentageSold =
    props.product.soldQuantity && props.product.quantity
      ? (props.product.soldQuantity /
          (props.product.quantity + props.product.soldQuantity)) *
        100
      : 0;
  return (
    <Link
      to={`/product-detail/${props.product.id}`}
      className={`${cx('long-width-product')} bg-white`}
    >
      <div className={cx('long-width-product__icon')}>
        <img
          className={cx('long-width-product__img')}
          src={props.product.mainImage}
          alt="Brand Logo"
        />
      </div>
      <div className={cx('long-width-product__info')}>
        <div className={cx('long-width-product__info__collection-name')}>
          {props.product.name}
        </div>

        {props.product.ratingCount !== undefined &&
        props.product.ratingCount > 0 ? (
          <div className={cx('long-width-product__info__rate')}>
            {props.product.averageRating && (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <ProductRating
                  rating={props.product.averageRating}
                  starSize={1.3}
                />
                ({props.product.averageRating})
              </div>
            )}
            <div className={cx('long-width-product-progress-quantity')}>
              Đã bán: {props.product.soldQuantity ?? 0}/
              {(props.product.quantity ?? 0) +
                (props.product.soldQuantity ?? 0)}
            </div>
          </div>
        ) : (
          <div className={cx('long-width-product__info__rate')}>
            <div className={cx('long-width-product__rating-quantity')}>
              (Chưa có đánh giá)
            </div>
            <div className={cx('long-width-product-progress-quantity')}>
              Đã bán: {props.product.soldQuantity ?? 0}/
              {(props.product.quantity ?? 0) +
                (props.product.soldQuantity ?? 0)}
            </div>
          </div>
        )}
        <div className={cx('long-width-product-progress')}>
          <div className={cx('long-width-product-progress-bar')}>
            <div
              className={cx('long-width-product-progress-value')}
              style={{ width: `${percentageSold}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BestSellingProduct;
