import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductModel from '../../models/ProductModel';
import ReviewModel from '../../models/ReviewModel';
import { getUserIdByToken } from '../../utils/Service/JwtService';
import { backendEndpoint } from '../../utils/Service/Constant';
import { TextareaAutosize, TextField } from '@mui/material';
import { Rating } from 'react-simple-star-rating';

interface ReviewModalProps {
  product?: ProductModel;
  handleCloseModal: any;
}

const ReviewModal: React.FC<ReviewModalProps> = (props) => {
  const userId = getUserIdByToken();
  // Tìm đánh giá của người dùng trong danh sách review của sản phẩm
  const foundReview =
    props.product?.reviews?.find((review) => review.userId === userId) || null;

  const [ratingValue, setRatingValue] = useState(0);
  const [content, setContent] = useState('');
  const [userReview, setUserReview] = useState<ReviewModel | null>(foundReview);

  // Xử lý thay đổi vote
  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };

  useEffect(() => {
    if (userReview) {
      setRatingValue(userReview.rating || 0);
      setContent(userReview.content || '');
    }
  }, [userReview]);

  // Xử lý submit
  function handleSubmitReviewForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    event.stopPropagation();
    if (ratingValue === 0) {
      toast.error('Bạn cần đánh giá thông qua số lượng sao!');
      return;
    }
    if (content.trim() === '') {
      toast.error('Nội dung đánh giá không được để trống!');
      return;
    }

    const token = localStorage.getItem('token');
    const endpoint =
      userReview === null || userReview === undefined
        ? '/reviews/add-review'
        : '/reviews/update-review';
    const method =
      userReview === null || userReview === undefined ? 'POST' : 'PUT';
    fetch(backendEndpoint + endpoint, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviewId: userReview?.id,
        userId: getUserIdByToken(),
        productId: props.product?.id,
        rating: ratingValue,
        content,
      }),
    })
      .then((response) => {
        if (response.ok) {
          userReview
            ? toast.success('Chỉnh sửa đánh giá thành công')
            : toast.success('Đánh giá sản phẩm thành công');
          props.handleCloseModal(true);
        } else {
          toast.error('Gặp lỗi trong quá trình đánh giá');
        }
      })
      .catch((error) => {
        toast.error('Gặp lỗi trong quá trình đánh giá');
      });
  }

  return (
    <div className="container p-0">
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          handleSubmitReviewForm(event);
        }}
      >
        <div className="text-center">
          <div className="default-title">ĐÁNH GIÁ SẢN PHẨM</div>
          <br />
          <h4
            className="mt-0"
            style={{ fontWeight: '400', lineHeight: '2.4rem' }}
          >
            <strong>Tên sản phẩm: </strong>
            {props.product?.name}
          </h4>
        </div>
        <div className="d-flex align-items-center justify-content-center mb-2">
          <strong className="mt-1 me-4">Đánh giá của bạn: </strong>
          <Rating
            size={25}
            transition={true}
            initialValue={ratingValue}
            onClick={(e) => handleRating(e)}
          />
        </div>
        <TextareaAutosize
          className="mt-4"
          aria-label="Nội dung đánh giá"
          placeholder="Nhập nội dung đánh giá của bạn"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={300}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '20px',
            borderRadius: '5px',
          }}
        />
        <div className="d-flex flex-row-reverse">
          <button
            type="submit"
            className="btn btn-dark mt-4 px-4 py-2 rounded-5"
            style={{ fontSize: '1.6rem' }}
          >
            {userReview === null || userReview === undefined
              ? 'ĐÁNH GIÁ'
              : 'CẬP NHẬT'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
