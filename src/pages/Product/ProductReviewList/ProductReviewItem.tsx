import { format } from 'date-fns';
import styles from './scss/ProductReviewItem.module.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { confirm } from 'material-ui-confirm';
import ReviewModel from '../../../models/ReviewModel';
import { getUserIdByToken } from '../../../utils/Service/JwtService';
import { backendEndpoint } from '../../../utils/Service/Constant';
import { useAuth } from '../../../utils/Context/AuthContext';
import UserModel from '../../../models/UserModel';
import ProductRating from '../ProductRating/ProductRating';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ProductReviewItemProps {
  review: ReviewModel;
}

function ProductReviewItem(props: ProductReviewItemProps) {
  const userId = getUserIdByToken();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  function handleDeleteReview(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    const token = localStorage.getItem('token');
    confirm({
      title: <span style={{ fontSize: '20px' }}>XÓA ĐÁNH GIÁ SẢN PHẨM</span>,
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
          const endpoint = '/review/delete-review';
          fetch(backendEndpoint + endpoint, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reviewId: props.review.id,
              productId: props.review.productId,
            }),
          })
            .then((response) => {
              if (response.ok) {
                toast.success('Xóa đánh giá thành công!');
              }
            })
            .catch((error) => {
              toast.error('Gặp lỗi trong quá trình xóa đánh giá!');
            });
        } else {
          toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
          return;
        }
      })
      .catch(() => {});
  }

  return (
    <div
      className={`${cx('product-details__review', { yourRating: props.review.userId === userId })}`}
    >
      {props.review.userId === userId && (
        <div className={cx('product-details__review-your-rating-title')}>
          Đánh giá của bạn
        </div>
      )}
      <div className={cx('product-details__review__avatar-wrap')}>
        <img
          src={props.review.userPhoto}
          alt="Avatar"
          className={cx('product-details__review__avatar')}
        />
      </div>
      <div className={cx('product-details__review__main')}>
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
            {userId === props.review.userId && (
              <>
                <div
                  onClick={() => {
                    if (!isLoggedIn) {
                      toast.error('Bạn cần đăng nhập để chỉnh sửa đánh giá!');
                      return;
                    }
                    setOpenModal(true);
                  }}
                  className={cx('product-details__review__option')}
                >
                  Chỉnh sửa
                </div>
                |
                <div
                  onClick={handleDeleteReview}
                  className={cx('product-details__review__option')}
                >
                  Xóa bình luận
                </div>
              </>
            )}
          </div>
          <ProductRating rating={props.review.rating} starSize={1.5} />
        </div>
        <p className={`${cx('product-details__review__content')} mb-0`}>
          {props.review.content}
        </p>
      </div>
    </div>
  );
}

export default ProductReviewItem;
