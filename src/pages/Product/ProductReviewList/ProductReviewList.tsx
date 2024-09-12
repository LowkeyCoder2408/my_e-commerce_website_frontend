import ReviewModal from '../../Review/ReviewModal';
import { SetStateAction, useEffect, useState } from 'react';
import styles from './scss/ProductReviewList.module.scss';
import { toast } from 'react-toastify';
import ProductModel from '../../../models/ProductModel';
import { useAuth } from '../../../utils/Context/AuthContext';
import classNames from 'classnames/bind';
import { getUserIdByToken } from '../../../utils/Service/JwtService';
import { FadeModal } from '../../../utils/FadeModal';
import ReviewItem from '../../Review/ReviewItem';
import ReviewModel from '../../../models/ReviewModel';
import { getReviewsByProduct } from '../../../api/ReviewAPI';
import Loader from '../../../utils/Loader';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

interface ProductReviewListProps {
  product: ProductModel;
  setProduct: React.Dispatch<SetStateAction<ProductModel | null>>;
}

const ProductReviewList = (props: ProductReviewListProps) => {
  const { isLoggedIn } = useAuth();
  const navigation = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [visibleProductReviews, setVisibleProductReviews] = useState<number>(4);
  const [hiddenProductReviews, setHiddenProductReviews] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const result = await getReviewsByProduct(props.product.id);
      setReviews(result);
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi lấy dữ liệu các đánh giá');
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return <Loader />;
  }

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
                fetchReviews={fetchReviews}
                setProduct={props.setProduct}
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
                toast.error('Bạn cần đăng nhập để đánh giá');
                navigation('/login', {
                  state: { from: location },
                });
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
            fetchReviews={fetchReviews}
            setProduct={props.setProduct}
          />
        )}
      </FadeModal>
    </div>
  );
};

export default ProductReviewList;
