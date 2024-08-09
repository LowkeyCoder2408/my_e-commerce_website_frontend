import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { toast } from 'react-toastify';
import ProductModel from '../../../models/ProductModel';
import Loader from '../Loader/Loader';
import FormatPrice from '../../../utils/FormatPrice';
import { getNewestProducts } from '../../../api/ProductAPI';
import classNames from 'classnames/bind';

interface ProductCardInterface {
  product: ProductModel;
  isShowQuickLink?: boolean;
}

const cx = classNames.bind(styles);

const ProductCard: React.FC<ProductCardInterface> = (props) => {
  // const { setTotalCart, cartList } = useCartItem();
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
  const navigation = useNavigate();

  const [newestProducts, setNewestProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInNewestProducts, setIsInNewestProducts] = useState<boolean>(false);

  useEffect(() => {
    getNewestProducts(12)
      .then((result) => {
        setNewestProducts(result.result);
        setLoading(false);
        // Kiểm tra xem sản phẩm hiện tại có trong newestProducts không
        const isInNewest = result.result.some(
          (product) => product.id === props.product.id,
        );
        setIsInNewestProducts(isInNewest);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Lấy danh sản phẩm sản phẩm mới không thành công!');
      });
  }, []);

  // Lấy tất cả sản phẩm yêu thích của người dùng đã đăng nhập ra
  // useEffect(() => {
  //   const customerId = getUserIdByToken();
  //   if (isToken()) {
  //     fetch(
  //       backendEndpoint +
  //         `/favorite-product/get-favorite-product/${customerId}`,
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('data: ', data);
  //         if (data.includes(props.product.id)) {
  //           setIsFavoriteProduct(true);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

  // const handleAddAProductToCart = async (newProduct: ProductModel) => {
  //   const inStockQuantity =
  //     props.product && props.product.quantity ? props.product.quantity : 0;

  //   // Kiểm tra nếu chưa đăng nhập
  //   if (!isToken()) {
  //     // Hiển thị thông báo yêu cầu đăng nhập
  //     toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
  //     return;
  //   }

  //   // cái existingProduct này sẽ tham chiếu đến cái cart ở trên, nên khi update thì cart nó cũng update theo
  //   let existingProduct = cartList.find(
  //     (cartItem) => cartItem.product.id === newProduct.id,
  //   );
  //   // Thêm 1 sản phẩm vào giỏ hàng
  //   if (existingProduct) {
  //     if (
  //       existingProduct.quantity &&
  //       existingProduct.quantity + 1 <= inStockQuantity
  //     ) {
  //       if (existingProduct.quantity !== undefined) {
  //         // nếu có rồi thì sẽ tăng số lượng
  //         existingProduct.quantity += 1;
  //       }

  //       // Lưu vào csdl
  //       const request = {
  //         id: existingProduct.id,
  //         quantity: existingProduct.quantity,
  //       };
  //       const token = localStorage.getItem('token');
  //       fetch(backendEndpoint + `/cart-item/update-item`, {
  //         method: 'PUT',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'content-type': 'application/json',
  //         },
  //         body: JSON.stringify(request),
  //       }).catch((error) => console.log(error));
  //       // Thông báo toast
  //       toast.success('Thêm vào giỏ hàng thành công');
  //     } else {
  //       toast.error(
  //         `Số lượng sản phẩm trong giỏ vượt quá số lượng tồn kho (${inStockQuantity})`,
  //       );
  //     }
  //   } else {
  //     if (inStockQuantity >= 1) {
  //       // Lưu vào db
  //       try {
  //         const request = {
  //           quantity: 1,
  //           product: newProduct,
  //           customerId: getUserIdByToken(),
  //         };
  //         const token = localStorage.getItem('token');
  //         const response = await fetch(
  //           backendEndpoint + '/cart-item/add-item',
  //           {
  //             method: 'POST',
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               'Content-type': 'application/json',
  //             },
  //             body: JSON.stringify(request),
  //           },
  //         );

  //         if (response.ok) {
  //           const idCart = await response.json();
  //           cartList.push({
  //             id: idCart,
  //             quantity: 1,
  //             product: newProduct,
  //           });
  //         }
  //       } catch (error) {
  //         console.log('Lỗi là', error);
  //       }
  //       // Thông báo toast
  //       toast.success('Thêm vào giỏ hàng thành công');
  //     } else {
  //       toast.error(
  //         `Số lượng sản phẩm trong giỏ vượt quá số lượng tồn kho (${inStockQuantity})`,
  //       );
  //     }
  //   }
  //   // Lưu vào localStorage
  //   localStorage.setItem('cart', JSON.stringify(cartList));
  //   setTotalCart(cartList.length);
  // };

  // Xử lý chức năng yêu sản phẩm
  // const handleFavoriteProduct = async (newProduct: ProductModel) => {
  //   if (!isToken()) {
  //     toast.info('Bạn phải đăng nhập để sử dụng chức năng này');
  //     // navigation('/login');
  //     return;
  //   }

  //   const customerId = getUserIdByToken();

  //   if (!isFavoriteProduct) {
  //     const token = localStorage.getItem('token');
  //     fetch(backendEndpoint + `/favorite-product/add-favorite-product`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         productId: props.product.id,
  //         customerId: customerId,
  //       }),
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           toast.success('Đã thêm vào danh sách sản phẩm yêu thích!');
  //         } else {
  //           toast.error(
  //             'Thêm vào danh sách sản phẩm yêu thích không thành công!',
  //           );
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Lỗi:', error);
  //       });
  //   } else {
  //     const token = localStorage.getItem('token');
  //     fetch(backendEndpoint + `/favorite-product/delete-favorite-product`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         productId: props.product.id,
  //         customerId: customerId,
  //       }),
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           toast.success('Đã xóa khỏi danh sách sản phẩm yêu thích!');
  //         } else {
  //           toast.error(
  //             'Xóa khỏi danh sách sản phẩm yêu thích không thành công!',
  //           );
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //   }
  //   setIsFavoriteProduct(!isFavoriteProduct);
  // };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={cx('product__item-wrapper')}>
      <div className={cx('product__item')}>
        <div className={cx('product__item-thumb')}>
          <Link
            to={`/products?id=${props.product.id}`}
            title="Xem chi tiết sản phẩm"
          >
            <img
              src={props.product.mainImage}
              alt=""
              className={cx('product__item-img')}
            />
          </Link>
          {props.isShowQuickLink === false ? (
            <></>
          ) : (
            <div className={cx('product__item-quick-link')}>
              <div
                title={isFavoriteProduct ? 'Bỏ thích' : 'Yêu thích'}
                style={{
                  backgroundColor: isFavoriteProduct
                    ? 'rgb(255, 66, 79)'
                    : '#fff',
                }}
                // onClick={() => {
                //   handleFavoriteProduct(props.product);
                // }}
                className={cx('product__item-quick-link-item')}
              >
                <FontAwesomeIcon
                  style={{
                    color: isFavoriteProduct ? '#fff' : '#000',
                  }}
                  icon={faHeart as IconProp}
                />
              </div>
              <div
                title="Thêm vào giỏ"
                // onClick={() => handleAddAProductToCart(props.product)}
                className={cx('product__item-quick-link-item')}
              >
                <FontAwesomeIcon icon={faCartShopping as IconProp} />
              </div>
            </div>
          )}
          {props.product.discountPercent &&
            props.product.discountPercent > 0 && (
              <div className={cx('box-label')}>
                <div className={cx('label-product', 'label_sale')}>
                  <span>-{props.product.discountPercent}%</span>
                </div>
              </div>
            )}

          {isInNewestProducts && (
            <div className={cx('box-label-new')}>
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1711558575/new_label_rizpn7.png"
                alt=""
              />
            </div>
          )}
        </div>
        <div className={cx('product__item-caption')}>
          <Link
            to={`/products?id=${props.product.id}`}
            className={cx('product__item-caption-name')}
          >
            <h4>
              <strong>{props.product.name}</strong>
            </h4>
          </Link>
          <div className={cx('product__item-caption-price')}>
            <span className={cx('product__item-caption-price__current')}>
              <FormatPrice price={props.product.currentPrice} />
            </span>
            <span className={cx('product__item-caption-price__old')}>
              <FormatPrice price={props.product.listedPrice} />
            </span>
          </div>
          <div className={cx('product__item-caption-summary')}>
            <div className={cx('product__item-caption-rating')}>
              {props.product.averageRating &&
              props.product.averageRating > 0 ? (
                <>
                  {props.product.averageRating}
                  <FontAwesomeIcon
                    icon={faStar as IconProp}
                    style={{ color: '#f5c31a' }}
                  />
                  <div style={{ color: '#444', marginRight: '10px' }}>
                    ({props.product.ratingCount})
                  </div>
                </>
              ) : (
                <div style={{ color: '#444', marginRight: '10px' }}>
                  0 đánh giá
                </div>
              )}
            </div>

            <div className={cx('product__item-caption-sell-quantity')}>
              Đã bán: {props.product.soldQuantity}
            </div>
          </div>
          <div
            title="Mua và thanh toán ngay"
            className={`${cx('btn-cart')} btn btn-dark`}
          >
            <span>Mua ngay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
