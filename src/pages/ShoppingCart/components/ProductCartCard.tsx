import { useConfirm } from 'material-ui-confirm';
import CartItemModel from '../../../models/CartItemModel';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMultiply, faRemove } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { backendEndpoint } from '../../../utils/Service/Constant';
import { isToken, isTokenExpired } from '../../../utils/Service/JwtService';
import FormatPrice from '../../../utils/Service/FormatPrice';
import SelectQuantity from '../../../utils/SelectQuantity';
import { useAuth } from '../../../utils/Context/AuthContext';
import styles from '../scss/ProductCartCard.module.scss';
import classNames from 'classnames/bind';
import { useCartItems } from '../../../utils/Context/CartItemContext';

const cx = classNames.bind(styles);

interface ProductCartCardProps {
  cartItem: CartItemModel;
  canChangeQuantity: boolean;
}

const ProductCartCard: React.FC<ProductCartCardProps> = (props) => {
  const token = localStorage.getItem('token');

  const confirm = useConfirm();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { cartItems, fetchCartItems } = useCartItems();

  const navigate = useNavigate();
  const location = useLocation();

  const [quantity, setQuantity] = useState(
    props.cartItem.product.quantity !== undefined
      ? props.cartItem.quantity &&
        props.cartItem.quantity > props.cartItem.product.quantity
        ? props.cartItem.product.quantity
        : props.cartItem.quantity
      : props.cartItem.quantity,
  );

  function handleDeleteCartItem() {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để xóa sản phẩm trong giỏ hàng');
      navigate('/login', { state: { from: location } });
      return;
    }

    if (isTokenExpired()) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      toast.error(
        'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục',
      );
      navigate('/login', { state: { from: location } });
      return;
    }

    confirm({
      title: (
        <span style={{ fontSize: '20px' }}>XÓA SẢN PHẨM TRONG GIỎ HÀNG</span>
      ),
      description: (
        <span style={{ fontSize: '16px' }}>
          Bạn có chắc chắn rằng sẽ loại bỏ sản phẩm này khỏi giỏ hàng?
        </span>
      ),
      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(() => {
        fetch(
          backendEndpoint + `/cart-items/delete-item/${props.cartItem.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
          },
        )
          .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
              if (data.status === 'success') {
                toast.success(
                  data.message || 'Xóa sản phẩm trong giỏ hàng thành công',
                );
                fetchCartItems();
              } else {
                toast.error(
                  data.message ||
                    'Xóa sản phẩm trong giỏ hàng không thành công',
                );
              }
            } else {
              toast.error('Xóa sản phẩm trong giỏ hàng không thành công');
            }
          })
          .catch((error) => console.log('Lỗi khi xóa:', error));
      })
      .catch(() => {});
  }

  const add = () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để chỉnh sửa số lượng trong giỏ hàng');
      navigate('/login', { state: { from: location } });
      return;
    }

    if (isTokenExpired()) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      toast.error(
        'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục',
      );
      navigate('/login', { state: { from: location } });
      return;
    }

    if (quantity) {
      if (
        quantity <
        (props.cartItem.product.quantity ? props.cartItem.product.quantity : 1)
      ) {
        setQuantity(quantity + 1);
        handleModifyQuantity(props.cartItem.product.id, 1);
      }
    }
  };

  const reduce = () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để chỉnh sửa số lượng trong giỏ hàng');
      navigate('/login', { state: { from: location } });
      return;
    }

    if (isTokenExpired()) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      toast.error(
        'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục',
      );
      navigate('/login', { state: { from: location } });
      return;
    }

    if (quantity) {
      if (quantity - 1 === 0) {
        handleDeleteCartItem();
      } else if (quantity > 1) {
        setQuantity(quantity - 1);
        handleModifyQuantity(props.cartItem.product.id, -1);
      }
    }
  };

  function handleModifyQuantity(productId: number, quantity: number) {
    let existingCartItem = cartItems.find(
      (cartItem) => cartItem.product.id === productId,
    );

    if (existingCartItem) {
      if (existingCartItem.quantity !== undefined) {
        existingCartItem.quantity += quantity;
      }

      fetch(backendEndpoint + `/cart-items/update-item`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          cartId: props.cartItem.id,
          quantity: existingCartItem.quantity,
        }),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            if (data.status === 'success') {
              toast.success(data.message || 'Cập nhật giỏ hàng thành công');
              fetchCartItems();
            } else {
              toast.error(data.message || 'Cập nhật giỏ hàng không thành công');
            }
          } else {
            toast.error('Đã xảy ra lỗi khi chỉnh sửa sản phẩm trong giỏ hàng');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div
      className={`${cx('product-cart-item')} bg-white mb-3`}
      style={{ borderRadius: '7px', width: '864px' }}
    >
      {props.canChangeQuantity && (
        <FontAwesomeIcon
          className={cx('product-cart-item__remove')}
          icon={faRemove as IconProp}
          onClick={() => handleDeleteCartItem()}
        />
      )}
      <div className="row">
        <div className="d-flex justify-content-center align-items-center col-2">
          <Link to={`/product-detail?id=${props.cartItem.product.id}`}>
            <img
              src={props.cartItem.product.mainImage}
              className={`${cx('product-cart-item__img')}`}
              alt={props.cartItem.product.name}
            />
          </Link>
        </div>
        <div
          className={`${cx('product-cart-item__info')} my-2 d-flex flex-column justify-content-center col-6`}
        >
          <Link to={`/product-detail?id=${props.cartItem.product.id}`}>
            <div className={cx('product-cart-item__name')}>
              {props.cartItem.product.name}
            </div>
          </Link>
          <div
            className={cx('product-cart-item__category')}
            style={{ color: '#000' }}
          >
            <strong>Danh mục: </strong>
            {props.cartItem.product.category.name} -{' '}
            <strong>Thương hiệu: </strong>
            {props.cartItem.product.brand.name.toUpperCase()}
          </div>
          <div className="d-flex gap-5">
            <div className="text-danger">
              <strong style={{ fontSize: '20px' }}>
                {props.cartItem.product.currentPrice && (
                  <FormatPrice price={props.cartItem.product.currentPrice} />
                )}
              </strong>
            </div>
            <div className="" style={{ marginTop: '4px' }}>
              <del style={{ fontSize: '17px', color: 'gray' }}>
                {props.cartItem.product.listedPrice && (
                  <FormatPrice price={props.cartItem.product.listedPrice} />
                )}
              </del>
            </div>
          </div>
        </div>
        {props.canChangeQuantity === true ? (
          <div className="text-center my-auto d-flex align-items-center justify-content-between col-2 py-3">
            <FontAwesomeIcon icon={faMultiply as IconProp} />
            <SelectQuantity
              max={props.cartItem.product.quantity}
              setQuantity={setQuantity}
              quantity={quantity}
              add={add}
              reduce={reduce}
              product={props.cartItem.product}
            />
          </div>
        ) : (
          <div
            className={`${cx('max-720-padding')} text-center my-auto d-flex align-items-center justify-content-between col-1 py-3`}
          >
            <FontAwesomeIcon icon={faMultiply as IconProp} />
            <strong>{quantity}</strong>
          </div>
        )}
        <div className={`text-center my-auto col-2`}>
          {quantity !== undefined &&
            props.cartItem.product.currentPrice !== undefined && (
              <span className="text-danger">
                <strong>
                  {quantity * props.cartItem.product.currentPrice && (
                    <FormatPrice
                      price={quantity * props.cartItem.product.currentPrice}
                    />
                  )}
                </strong>
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCartCard;
