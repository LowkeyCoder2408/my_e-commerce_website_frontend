import ReviewModal from '../../Review/ReviewModal';
import { useState } from 'react';
import styles from './scss/ProductReviewList.module.scss';
import { toast } from 'react-toastify';
import ProductModel from '../../../models/ProductModel';
import { useAuth } from '../../../utils/Context/AuthContext';
import classNames from 'classnames/bind';
import { getUserIdByToken } from '../../../utils/Service/JwtService';
import { FadeModal } from '../../../utils/FadeModal';
import ReviewItem from '../../Review/ReviewItem';

const cx = classNames.bind(styles);

interface ProductReviewListProps {
  product: ProductModel;
}

const ProductReviewList = (props: ProductReviewListProps) => {
  const { isLoggedIn } = useAuth();

  const [reviews, setReviews] = useState(props.product.reviews || []);
  const [visibleProductReviews, setVisibleProductReviews] = useState(4);
  const [hiddenProductReviews, setHiddenProductReviews] = useState(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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

  const handleDeleteReview = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId),
    );
    toast.success('Xóa đánh giá thành công!');
  };

  return (
    <div className={cx('product-details__review__wrapper')}>
      <div className={cx('product-details__review__heading')}>
        <div className="default-title">Đánh giá của người dùng</div> (
        {reviews.length} lượt đánh giá)
      </div>
      <div className={cx('product-details__review__list-wrapper')}>
        {reviews.length > 0 ? (
          <div className={cx('product-details__review__list')}>
            {reviews.slice(0, visibleProductReviews).map((review, index) => (
              <ReviewItem
                key={index}
                review={review}
                onDeleteReview={handleDeleteReview}
              />
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
          {visibleProductReviews < reviews.length && (
            <div
              className={cx('product-details__review__show-option')}
              onClick={loadMoreProductReviews}
            >
              <strong>Xem thêm...</strong>
            </div>
          )}
          {hiddenProductReviews > 0 && (
            <div
              className={cx('product-details__review__show-option')}
              onClick={hideProductReviews}
            >
              <strong>Ẩn bớt</strong>
            </div>
          )}
        </div>
        {!reviews.some((review) => review.userId === getUserIdByToken()) && (
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
            <strong>Viết đánh giá</strong>
          </div>
        )}
      </div>
      <FadeModal
        open={openModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
      >
        {props.product && (
          <ReviewModal
            product={props.product}
            handleCloseModal={handleCloseModal}
          />
        )}
      </FadeModal>
    </div>
  );
};

export default ProductReviewList;
