import { FormEvent, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductModel from '../../models/ProductModel';
import ReviewModel from '../../models/ReviewModel';
import { getUserIdByToken } from '../../utils/Service/JwtService';
import { backendEndpoint } from '../../utils/Service/Constant';
import { TextareaAutosize } from '@mui/material';
import { Rating } from 'react-simple-star-rating';
import { getUserReviewByProduct } from '../../api/ReviewAPI';
import { getProductById } from '../../api/ProductAPI';

interface ReviewModalProps {
  product?: ProductModel;
  handleCloseModal: (updated: boolean) => void;
  fetchReviews: () => void;
  setProduct: React.Dispatch<SetStateAction<ProductModel | null>>;
}

const ReviewModal: React.FC<ReviewModalProps> = (props) => {
  const userId = getUserIdByToken();

  const [ratingValue, setRatingValue] = useState(0);
  const [content, setContent] = useState('');
  const [userReview, setUserReview] = useState<ReviewModel | null>(null);

  // Xử lý thay đổi vote
  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };

  // Xử lý submit
  const handleSubmitReviewForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (ratingValue === 0) {
      toast.error('Bạn cần đánh giá thông qua số lượng sao từ 1-5');
      return;
    }
    if (content.trim() === '') {
      toast.error('Nội dung đánh giá không được để trống!');
      return;
    }

    const token = localStorage.getItem('token');
    const endpoint = userReview
      ? '/reviews/update-review'
      : '/reviews/add-review';
    const method = userReview ? 'PUT' : 'POST';

    try {
      const response = await fetch(backendEndpoint + endpoint, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId: userReview?.id,
          userId,
          productId: props.product?.id,
          rating: ratingValue,
          content,
        }),
      });

      if (response.ok) {
        toast.success(
          userReview
            ? 'Chỉnh sửa đánh giá thành công'
            : 'Đánh giá sản phẩm thành công',
        );
        props.handleCloseModal(true);
        props.fetchReviews();
        getProductById(props.product?.id ?? 0).then((result) => {
          props.setProduct(result);
        });
      } else {
        toast.error('Gặp lỗi trong quá trình đánh giá');
      }
    } catch (error) {
      toast.error('Gặp lỗi trong quá trình đánh giá');
      console.error('Lỗi khi đánh giá:', error);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      if (userId && props.product?.id) {
        try {
          const url = `${backendEndpoint}/reviews/findByUserIdAndProductId?userId=${userId}&productId=${props.product.id}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error('Không thể truy cập dữ liệu');
          }

          // Kiểm tra xem phản hồi có dữ liệu không
          if (response.status === 204) {
            // Phản hồi không có nội dung
            setUserReview(null);
            return;
          }

          // Parse JSON nếu có dữ liệu
          const result = await response.json();
          setUserReview(result);
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu review theo người dùng', error);
        }
      }
    };

    fetchReview();
  }, [userId, props.product?.id]);

  useEffect(() => {
    if (userReview) {
      setRatingValue(userReview.rating || 0);
      setContent(userReview.content || '');
    }
  }, [userReview]);

  return (
    <div className="container p-0">
      <form onSubmit={handleSubmitReviewForm}>
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
            onClick={handleRating}
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
            {userReview ? 'CẬP NHẬT' : 'ĐÁNH GIÁ'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
