import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { toast } from 'react-toastify';
import ProductModel from '../../../models/ProductModel';
import Loader from '../../../utils/Loader';
import FormatPrice from '../../../utils/Service/FormatPrice';
import { getNewestProducts } from '../../../api/ProductAPI';
import classNames from 'classnames/bind';
import { getUserIdByToken } from '../../../utils/Service/JwtService';
import { backendEndpoint } from '../../../utils/Service/Constant';
import FavoriteProductModel from '../../../models/FavoriteProductModel';
import { getAllFavoriteProductsByUserId } from '../../../api/FavoriteProductAPI';
import { useFavoriteProducts } from '../../../utils/Context/FavoriteProductContext';
import { useCartItems } from '../../../utils/Context/CartItemContext';
import { useAuth } from '../../../utils/Context/AuthContext';

interface ProductCardInterface {
  product: ProductModel;
  isShowQuickLink?: boolean;
}

const cx = classNames.bind(styles);

const ProductCard: React.FC<ProductCardInterface> = (props) => {
  const userId = getUserIdByToken();
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigation = useNavigate();
  const { isLoggedIn } = useAuth();

  const { fetchFavoriteProducts } = useFavoriteProducts();
  const { cartItems, fetchCartItems } = useCartItems();
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInNewestProducts, setIsInNewestProducts] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newestResult, favoriteProducts] = await Promise.all([
          getNewestProducts(12),
          isLoggedIn ? getAllFavoriteProductsByUserId(userId ?? 0) : [],
        ]);

        const isInNewest = newestResult.result.some(
          (product) => product.id === props.product.id,
        );
        const isProductFavorite = favoriteProducts.some(
          (favorite: FavoriteProductModel) =>
            favorite.productId === props.product?.id,
        );
        setIsInNewestProducts(isInNewest);
        setIsFavoriteProduct(isProductFavorite);
      } catch (error) {
        setLoading(false);
        console.log('Lấy danh sách sản phẩm mới không thành công: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, props.product?.id]);

  const handleAddAProductToCart = async (newProduct: ProductModel) => {
    const inStockQuantity = props.product.quantity || 0;
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để thêm vào giỏ hàng!');
      navigation('/login', { state: { from: location } });
      return;
    }

    let existingCartItem = cartItems.find(
      (cartItem) => cartItem.product.id === newProduct.id,
    );
    try {
      if (existingCartItem) {
        if (
          existingCartItem.quantity &&
          existingCartItem.quantity + 1 <= inStockQuantity
        ) {
          existingCartItem.quantity += 1;

          const request = {
            cartId: existingCartItem.id,
            quantity: existingCartItem.quantity,
          };

          const response = await fetch(
            backendEndpoint + `/cart-items/update-item`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
              },
              body: JSON.stringify(request),
            },
          );

          const responseData = await response.json();

          if (response.ok && responseData.status === 'success') {
            toast.success(
              responseData.message || 'Thêm vào giỏ hàng thành công',
            );
            fetchCartItems();
          } else {
            toast.error(
              responseData.message || 'Thêm vào giỏ hàng không thành công',
            );
          }
        } else {
          toast.error(
            `Số lượng sản phẩm trong giỏ vượt quá số lượng tồn kho (${inStockQuantity})`,
          );
        }
      } else {
        if (inStockQuantity >= 1) {
          const request = {
            quantity: 1,
            productId: newProduct.id,
            userId: getUserIdByToken(),
          };

          const response = await fetch(
            backendEndpoint + '/cart-items/add-item',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
              },
              body: JSON.stringify(request),
            },
          );

          const data = await response.json();
          if (response.ok && data.status === 'success') {
            toast.success(data.message);
            fetchCartItems();
          } else {
            toast.error(
              data.message || 'Thêm sản phẩm vào giỏ hàng không thành công',
            );
          }
        } else {
          toast.error(
            `Số lượng sản phẩm trong giỏ vượt quá số lượng tồn kho (${inStockQuantity})`,
          );
        }
      }
    } catch (error) {
      console.log('Lỗi là', error);
      toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  const handleFavoriteProduct = async (newProduct: ProductModel) => {
    if (!isLoggedIn) {
      toast.error('Bạn phải đăng nhập để yêu thích sản phẩm');
      navigation('/login', {
        state: { from: location },
      });
      return;
    }

    if (!isFavoriteProduct) {
      fetch(backendEndpoint + `/favorite-products/add-favorite-product`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          productId: props.product.id,
          userId: userId,
        }),
      })
        .then((response) => {
          if (response.ok) {
            toast.success('Đã thêm vào danh sách sản phẩm yêu thích!');
            fetchFavoriteProducts();
          } else {
            toast.error(
              'Thêm vào danh sách sản phẩm yêu thích không thành công!',
            );
          }
        })
        .catch((error) => {
          console.error('Lỗi:', error);
        });
    } else {
      fetch(backendEndpoint + `/favorite-products/delete-favorite-product`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          productId: props.product.id,
          userId: userId,
        }),
      })
        .then((response) => {
          if (response.ok) {
            toast.success('Đã xóa khỏi danh sách sản phẩm yêu thích!');
            fetchFavoriteProducts();
          } else {
            toast.error(
              'Xóa khỏi danh sách sản phẩm yêu thích không thành công!',
            );
          }
        })
        .catch((error) => console.log(error));
    }
    // Sau khi API call thành công, cập nhật lại danh sách sản phẩm yêu thích
    setIsFavoriteProduct(!isFavoriteProduct);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={cx('product__item-wrapper')}>
      <div className={cx('product__item')}>
        <div className={cx('product__item-thumb')}>
          <Link
            to={`/product-detail?id=${props.product.id}`}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleFavoriteProduct(props.product);
                }}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddAProductToCart(props.product);
                }}
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
            to={`/product-detail?id=${props.product.id}`}
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
                  {props.product.averageRating.toFixed(1)}
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
