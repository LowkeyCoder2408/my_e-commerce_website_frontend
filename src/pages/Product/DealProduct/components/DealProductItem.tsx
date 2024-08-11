import styles from '../scss/DealProductItem.module.scss';
import { Link } from 'react-router-dom';
import ProductModel from '../../../../models/ProductModel';
import classNames from 'classnames/bind';
import FormatPrice from '../../../../utils/Functions/FormatPrice';
import ProductRating from '../../ProductRating/ProductRating';

const cx = classNames.bind(styles);

interface DealProductItemProps {
  product: ProductModel;
}

const DealProductItem = (props: DealProductItemProps) => {
  const formatCurrency = (number: number) => {
    return number.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const percentageSold =
    props.product.soldQuantity && props.product.quantity
      ? (props.product.soldQuantity / props.product.quantity) * 100
      : 0;
  return (
    <div className={cx('product-deal-item')}>
      <Link
        to={`/product-detail/${props.product.id}`}
        className={cx('product-deal-item__img')}
        title="Click để xem thông tin"
      >
        <img src={props.product.mainImage} alt="Book Image" />
      </Link>
      <div className={cx('product-deal-item__info')}>
        <div className={cx('product-deal-item-meta')}>
          <Link
            to={`/product-detail/${props.product.id}`}
            className={cx('product-deal-item-meta__title')}
          >
            {props.product.name}
          </Link>
        </div>
        <div className={cx('product-deal-item__reference')}>
          <div className={cx('rating')}>
            {props.product.ratingCount ? (
              <div className={`${cx('product-deal-item__info-more')} d-flex`}>
                <ProductRating
                  rating={props.product.averageRating}
                  starSize={1.5}
                />
                <div className="mt-2 ms-2">
                  ({props.product.ratingCount} đánh giá)
                </div>
              </div>
            ) : (
              <div className={`${cx('product-deal-item__info-more')} mt-2`}>
                (Chưa có đánh giá)
              </div>
            )}
          </div>
        </div>
        <div className={cx('product-deal-item__info-more')}>
          {props.product.category.name} - Hãng: {props.product.brand.name}
        </div>
        <div className={cx('product-deal-item__price')}>
          <span>
            <FormatPrice price={props.product.currentPrice} />
          </span>{' '}
          {props.product.listedPrice !== undefined &&
            props.product.currentPrice !== undefined && (
              <span
                className="ms-1"
                style={{ fontSize: '14px', color: '#444', fontWeight: '450' }}
              >
                {props.product.listedPrice - props.product.currentPrice > 0 ? (
                  <>
                    (Giảm{' '}
                    {formatCurrency(
                      props.product.listedPrice - props.product.currentPrice,
                    )}
                    )
                  </>
                ) : (
                  <>Không giảm</>
                )}
              </span>
            )}
        </div>
        <div className={cx('product-deal-item__deal-progress')}>
          <div className={cx('progress-bar')}>
            <div
              className={cx('progress-value')}
              style={{ width: `${percentageSold}%` }}
            ></div>
            {props.product.soldQuantity !== undefined &&
              props.product.quantity !== undefined && (
                <div
                  className={`${cx('product-deal-item__deal-quantity')} text-dark`}
                >
                  Đã bán: {props.product.soldQuantity}/
                  {props.product.quantity + props.product.soldQuantity}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealProductItem;
