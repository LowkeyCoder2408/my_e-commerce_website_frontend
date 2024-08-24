import React, { SetStateAction, useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import styles from './scss/ReviewItem.module.scss';
import { toast } from 'react-toastify';
import { confirm } from 'material-ui-confirm';
import classNames from 'classnames/bind';
import ReviewModel from '../../models/ReviewModel';
import { getUserIdByToken } from '../../utils/Service/JwtService';
import { useAuth } from '../../utils/Context/AuthContext';
import ProductRating from '../Product/ProductRating/ProductRating';
import { FadeModal } from '../../utils/FadeModal';
import ReviewModal from './ReviewModal';
import ProductModel from '../../models/ProductModel';
import { getProductById } from '../../api/ProductAPI';
import { deleteReview } from '../../api/ReviewAPI';

const cx = classNames.bind(styles);

interface ReviewItemProps {
  review: ReviewModel;
  fetchReviews: () => void;
  setProduct: React.Dispatch<SetStateAction<ProductModel | null>>;
}

function ReviewItem(props: ReviewItemProps) {
  const userId = getUserIdByToken();
  const token = localStorage.getItem('token');
  const { isLoggedIn } = useAuth();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductModel>();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteReview = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      confirm({
        title: <div className="default-title">XÓA ĐÁNH GIÁ SẢN PHẨM</div>,
        description: (
          <span style={{ fontSize: '16px' }}>
            Bạn có chắc chắn rằng sẽ xóa đánh giá này?
          </span>
        ),
        confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
        cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
      })
        .then(() => {
          if (isLoggedIn) {
            deleteReview(props.review.id, token!)
              .then((response) => {
                if (response.ok) {
                  toast.success('Xóa đánh giá thành công!');
                  props.fetchReviews();
                  getProductById(props.review.productId).then((result) => {
                    props.setProduct(result);
                  });
                } else {
                  toast.error('Gặp lỗi trong quá trình xóa đánh giá!');
                }
              })
              .catch(() => {
                toast.error('Gặp lỗi trong quá trình xóa đánh giá!');
              });
          } else {
            toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
          }
        })
        .catch(() => {});
    },
    [
      isLoggedIn,
      props.review.id,
      token,
      props.fetchReviews,
      props.review.productId,
      props.setProduct,
    ],
  );

  useEffect(() => {
    getProductById(props.review.productId).then((result) => {
      setProduct(result);
    });
  }, [props.review.productId]);

  const handleEditReview = () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để chỉnh sửa đánh giá!');
      return;
    }
    handleOpenModal();
  };

  return (
    <div
      key={props.review.id}
      className={cx('product-details__review', {
        yourRating: props.review.userId === userId,
      })}
    >
      {props.review.userId === userId && (
        <div className={cx('product-details__review-your-rating-title')}>
          Đánh giá của bạn
        </div>
      )}

      <div className={cx('product-details__review__main')}>
        <div className="d-flex align-items-center">
          <img
            src={props.review.userPhoto}
            alt="Avatar"
            className={cx('product-details__review__avatar')}
          />
          <div className={cx('product-details__review__info')}>
            <div className={cx('product-details__review__header')}>
              <span className={cx('product-details__review__name')}>
                {props.review.userFullName}
              </span>
              {props.review.reviewTime && (
                <span className={cx('product-details__review__time')}>
                  {format(props.review.reviewTime, 'dd/MM/yyyy')}, lúc{' '}
                  {format(props.review.reviewTime, 'HH:mm:ss')}
                </span>
              )}
            </div>
            {userId === props.review.userId && (
              <div className="d-flex gap-2">
                <div
                  onClick={handleEditReview}
                  className={cx('product-details__review__option')}
                >
                  Chỉnh sửa
                </div>
                |
                <div
                  onClick={handleDeleteReview}
                  className={cx('product-details__review__option')}
                >
                  Xóa
                </div>
              </div>
            )}
          </div>
        </div>
        <ProductRating rating={props.review.rating} starSize={1.5} />
      </div>

      <div className={cx('product-details__review__content')}>
        {props.review.content}
      </div>
      <FadeModal
        open={openModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
      >
        {product && (
          <ReviewModal
            product={product}
            handleCloseModal={handleCloseModal}
            fetchReviews={props.fetchReviews}
            setProduct={props.setProduct}
          />
        )}
      </FadeModal>
    </div>
  );
}

export default ReviewItem;