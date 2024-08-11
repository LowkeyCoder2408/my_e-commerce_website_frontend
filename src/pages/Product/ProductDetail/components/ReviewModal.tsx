// import { FormEvent, useEffect, useState } from 'react';
// import { TextField, Typography } from '@mui/material';
// // import { Rating } from 'react-simple-star-rating';
// import { toast } from 'react-toastify';
// import ProductModel from '../../../../models/ProductModel';

// interface ReviewModalProps {
//   product?: ProductModel;
//   handleCloseModal: any;
// }

// export const ReviewModal: React.FC<ReviewModalProps> = (props) => {
//   const [ratingValue, setRatingValue] = useState(0);
//   // const [errorRating, setErrorRating] = useState('');
//   const [comment, setComment] = useState('');
//   const [customerReview, setCustomerReview] = useState<ReviewModel | null>(
//     null,
//   );

//   // Xử lý thay đổi vote
//   const handleRating = (rate: number) => {
//     // setErrorRating('');
//     setRatingValue(rate);
//   };

//   useEffect(() => {
//     // console.log('Customer review:', customerReview);
//     if (customerReview) {
//       // const token = localStorage.getItem('token');
//       // const customerId = getUserIdByToken();
//       // getCustomerReviewByProduct(customerId, props.product?.id)
//       //   .then((data) => {
//       console.log(customerReview);
//       setRatingValue(customerReview.rating || 0);
//       setComment(customerReview.comment || '');
//       // })
//       // .catch((error) => console.log(error));
//     }
//   }, [customerReview]);

//   useEffect(() => {
//     const customerId = getUserIdByToken();
//     getCustomerReviewByProduct(customerId, props.product?.id)
//       .then((result) => {
//         console.log(result);
//         setCustomerReview(result.review);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   // Xử lý submit
//   function handleSubmitReviewForm(event: FormEvent<HTMLFormElement>): void {
//     event.preventDefault();
//     event.stopPropagation();
//     if (ratingValue === 0) {
//       toast.error('Bạn cần đánh giá thông qua số lượng sao!');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     const endpoint =
//       customerReview === null || customerReview === undefined
//         ? '/review/add-review'
//         : '/review/update-review';
//     const method =
//       customerReview === null || customerReview === undefined ? 'POST' : 'PUT';
//     fetch(backendEndpoint + endpoint, {
//       method: method,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         reviewId: customerReview?.id,
//         customerId: getUserIdByToken(),
//         productId: props.product?.id,
//         rating: ratingValue,
//         comment,
//       }),
//     })
//       .then((response) => {
//         customerReview
//           ? toast.success('Chỉnh sửa đánh giá thành công')
//           : toast.success('Đánh giá sản phẩm thành công');
//       })
//       .catch((error) => {
//         toast.error('Gặp lỗi trong quá trình đánh giá');
//       });
//   }

//   return (
//     <div className="container">
//       <form
//         onSubmit={(event: FormEvent<HTMLFormElement>) => {
//           event.preventDefault();
//           event.stopPropagation();
//           props.handleCloseModal(true);
//           handleSubmitReviewForm(event);
//         }}
//       >
//         <div className="text-center">
//           <h2 className="mb-0">
//             <strong>ĐÁNH GIÁ SẢN PHẨM</strong>
//           </h2>
//           <br />
//           <h4 className="mt-0" style={{ fontWeight: '400' }}>
//             <strong>Tên sản phẩm: </strong>
//             {props.product?.name}
//           </h4>
//         </div>
//         <div className="d-flex align-items-center mb-2">
//           <strong className="mt-2 me-4">Đánh giá của bạn: </strong>
//           <Rating
//             size={25}
//             transition={true}
//             initialValue={ratingValue}
//             onClick={(e) => handleRating(e)}
//           />
//         </div>
//         <TextField
//           className="w-100 my-3"
//           id="standard-basic"
//           label="Nội dung đánh giá"
//           variant="standard"
//           required
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <div className="d-flex flex-row-reverse">
//           <button
//             type="submit"
//             className="btn btn-dark mt-4 px-4 py-2 rounded-5"
//             style={{ fontSize: '1.6rem' }}
//             onClick={() => props.handleCloseModal(true)}
//           >
//             {customerReview === null || customerReview === undefined
//               ? 'ĐÁNH GIÁ'
//               : 'CẬP NHẬT'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

const ReviewModal = () => {
  return <div>ReviewModal</div>;
};

export default ReviewModal;
