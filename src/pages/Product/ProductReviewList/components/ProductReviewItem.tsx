// import { format } from 'date-fns';
// import ProductRating from '../../../ProductDetail/components/ProductRating';
// import ReviewModel from '../../../../../../models/ReviewModel';
// import './ProductReviewItem.css';
// import { FormEvent, useEffect, useState } from 'react';
// import CustomerModel from '../../../../../../models/CustomerModel';
// import { getCustomerByReviewId } from '../../../../../../api/CustomerAPI';
// import { getUserIdByToken, isToken } from '../../../../../../utils/JwtService';
// import { getCustomerReviewByProduct } from '../../../../../../api/ReviewAPI';
// import ProductModel from '../../../../../../models/ProductModel';
// import { getProductByReviewId } from '../../../../../../api/ProductAPI';
// import { FadeModal } from '../../../../../../utils/FadeModal';
// import { ReviewModal } from '../../../ProductDetail/components/ReviewModal';
// import { toast } from 'react-toastify';
// import { backendEndpoint } from '../../../../../../utils/Constant';
// import { confirm } from 'material-ui-confirm';

// interface ProductReviewItemProps {
//   review: ReviewModel;
// }

// function ProductReviewItem(props: ProductReviewItemProps) {
//   const [customer, setCustomer] = useState<CustomerModel | null>(null);
//   const [customerReview, setCustomerReview] = useState<ReviewModel | null>(
//     null,
//   );
//   const [product, setProduct] = useState<ProductModel | null>(null);
//   const customerId = getUserIdByToken();
//   const [openModal, setOpenModal] = useState<boolean>(false);

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   useEffect(() => {
//     getProductByReviewId(props.review.id)
//       .then((result) => {
//         setProduct(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     if (product) {
//       getCustomerReviewByProduct(customerId, product.id)
//         .then((result) => {
//           console.log('RV của customer', result);
//           setCustomerReview(result.review);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, [product]); // Chỉ gọi khi product thay đổi

//   useEffect(() => {
//     getCustomerByReviewId(props.review.id)
//       .then((result) => {
//         setCustomer(result);
//       })
//       .catch((error) => {
//         console.log('Lỗi khi lấy customer by review', error);
//       });
//   }, []);

//   function handleDeleteReview(
//     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
//   ): void {
//     event.preventDefault();
//     event.stopPropagation();
//     const token = localStorage.getItem('token');
//     confirm({
//       title: <span style={{ fontSize: '20px' }}>XÓA ĐÁNH GIÁ SẢN PHẨM</span>,
//       description: (
//         <span style={{ fontSize: '16px' }}>
//           Bạn có chắc chắn rằng sẽ xóa đánh giá này?
//         </span>
//       ),
//       confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
//       cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
//     })
//       .then(() => {
//         if (isToken()) {
//           const endpoint = '/review/delete-review';
//           fetch(backendEndpoint + endpoint, {
//             method: 'POST',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               reviewId: props.review.id,
//               productId: product?.id,
//             }),
//           })
//             .then((response) => {
//               if (response.ok) {
//                 toast.success('Xóa đánh giá thành công!');
//               }
//             })
//             .catch((error) => {
//               toast.error('Gặp lỗi trong quá trình xóa đánh giá!');
//             });
//         } else {
//           toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
//           return;
//         }
//       })
//       .catch(() => {});
//   }

//   return (
//     <div
//       className={`product-details__review ${
//         customerReview?.id === props.review.id ? 'yourRating' : ''
//       }`}
//     >
//       {customerReview?.id === props.review.id && (
//         <div className="product-details__review-your-rating">
//           Đánh giá của bạn
//         </div>
//       )}
//       <div className="product-details__review__avatar-wrap">
//         <img
//           src={customer?.avatar}
//           alt="Avatar"
//           className="product-details__review__avatar"
//         />
//       </div>
//       <div className="product-details__review__main">
//         <div className="product-details__review__info">
//           <div className="product-details__review__header">
//             <span className="product-details__review__name">
//               {customer?.fullName}
//             </span>
//             <span className="product-details__review__time">
//               {format(props.review.reviewTime, 'dd/MM/yyyy')}, lúc{' '}
//               {format(props.review.reviewTime, 'HH:mm:ss')}
//             </span>
//             {customerReview !== null &&
//               customerReview !== undefined &&
//               customerId === customer?.id && (
//                 <>
//                   <div
//                     onClick={() => {
//                       if (!isToken()) {
//                         toast.error('Bạn cần đăng nhập để đánh giá!');
//                         return;
//                       }
//                       setOpenModal(true);
//                     }}
//                     className="product-details__review__option"
//                   >
//                     Chỉnh sửa
//                   </div>
//                   |
//                   <div
//                     onClick={handleDeleteReview}
//                     className="product-details__review__option"
//                   >
//                     Xóa bình luận
//                   </div>
//                 </>
//               )}
//           </div>
//           <ProductRating rating={props.review.rating} />
//         </div>
//         <p className="product-details__review__content mb-0">
//           {props.review.comment}
//         </p>
//       </div>
//       <FadeModal
//         open={openModal}
//         handleOpen={handleOpenModal}
//         handleClose={handleCloseModal}
//       >
//         {product && (
//           <ReviewModal product={product} handleCloseModal={handleCloseModal} />
//         )}
//       </FadeModal>
//     </div>
//   );
// }

// export default ProductReviewItem;

import React from 'react';

const ProductReviewItem = () => {
  return <div>ProductReviewItem</div>;
};

export default ProductReviewItem;
