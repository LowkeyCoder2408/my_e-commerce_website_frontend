import React, { useEffect, useState } from 'react';
import styles from './scss/ProductReviewList.module.scss';
import { toast } from 'react-toastify';
import ProductModel from '../../../models/ProductModel';
import ReviewModel from '../../../models/ReviewModel';
import { getUserIdByToken } from '../../../utils/Service/JwtService';
import Loader from '../../../utils/Loader';
import ProductReviewItem from './ProductReviewItem';
import { useAuth } from '../../../utils/Context/AuthContext';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ProductReviewListProps {
  product: ProductModel;
}

const ProductReviewList = (props: ProductReviewListProps) => {
  const { isLoggedIn } = useAuth();

  const [userReview, setUserReview] = useState<ReviewModel | null>(null);
  const [visibleProductReviews, setVisibleProductReviews] = useState(4);
  const [hiddenProductReviews, setHiddenProductReviews] = useState(0);
  const [error, setError] = useState<any>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   const userId = getUserIdByToken();
  //   getUserReviewByProduct(userId, props.productId)
  //     .then((result) => {
  //       console.log(result);
  //       setUserReview(result.review);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [reviewsList]);

  if (error) {
    return (
      <div>
        <h1>Gặp lỗi: {error.message}</h1>
      </div>
    );
  }

  const loadMoreProductReviews = () => {
    setVisibleProductReviews(
      (prevVisibleProductReviews) => prevVisibleProductReviews + 4,
    );
    setHiddenProductReviews(hiddenProductReviews + 4);
  };

  const hideProductReviews = () => {
    setVisibleProductReviews(4);
    setHiddenProductReviews(0);
  };

  return (
    <div className={cx('product-details__review__wrapper')}>
      <div className={cx('product-details__review__heading')}>
        <strong>
          <h2>ĐÁNH GIÁ CỦA NGƯỜI DÙNG</h2>
        </strong>
        ({props.product.reviews?.length} lượt đánh giá)
      </div>
      <div className={cx('product-details__review__list-wrapper')}>
        {props.product.reviews && props.product.reviews.length > 0 ? (
          <div className={cx('product-details__review__list')}>
            {props.product.reviews
              .slice(0, visibleProductReviews)
              .map((review, index) => (
                <ProductReviewItem key={index} review={review} />
              ))}
          </div>
        ) : (
          <div className={cx('product-details__review__no')}>
            <img
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1711643592/no_review_isqiad.png"
              alt=""
            />
            <span>Chưa có đánh giá nào cho sản phẩm này</span>
          </div>
        )}
      </div>
      <div className={cx('product-details__review__footer')}>
        <div className={cx('product-details__review__show')}>
          {visibleProductReviews < (props.product.reviews?.length || 0) && (
            <div
              className={cx('product-details__review__show-option')}
              onClick={loadMoreProductReviews}
            >
              Xem thêm...
            </div>
          )}
          {hiddenProductReviews > 0 && (
            <div
              className={cx('product-details__review__show-option')}
              onClick={hideProductReviews}
            >
              Ẩn bớt
            </div>
          )}
        </div>
        {userReview === null ||
          (userReview === undefined && (
            <div
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error('Bạn cần đăng nhập để đánh giá!');
                  return;
                }
                setOpenModal(true);
              }}
              className={cx('product-details__review__show-option')}
            >
              Viết đánh giá
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductReviewList;
