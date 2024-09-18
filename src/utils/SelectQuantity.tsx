import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ProductModel from '../models/ProductModel';
import { backendEndpoint } from './Service/Constant';
import { isTokenExpired } from './Service/JwtService';
import styles from './scss/SelectQuantity.module.scss';
import classNames from 'classnames/bind';
import { useAuth } from './Context/AuthContext';
import { useCartItems } from './Context/CartItemContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

interface SelectQuantityProps {
  max: number | undefined;
  setQuantity?: any;
  quantity?: number;
  add?: any;
  reduce?: any;
  product?: ProductModel;
}

const SelectQuantity: React.FC<SelectQuantityProps> = (props) => {
  const token = localStorage.getItem('token');

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { cartItems, fetchCartItems } = useCartItems();

  const navigate = useNavigate();
  const location = useLocation();

  // Xử lý khi thay đổi input quantity bằng bàn phím
  const handleChangeQuantityByKeyboard = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
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

    const newQuantity = parseInt(e.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= (props.max ? props.max : 1)
    ) {
      props.setQuantity(newQuantity);
      let existingCartItem = cartItems.find(
        (cartItem) => cartItem.product.id === props.product?.id,
      );
      // Thêm 1 sản phẩm vào giỏ hàng
      if (existingCartItem) {
        // nếu có rồi thì sẽ gán là số lượng mới
        existingCartItem.quantity = newQuantity;
        fetch(backendEndpoint + `/cart-items/update-item`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            cartId: existingCartItem.id,
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
                toast.error(
                  data.message || 'Cập nhật giỏ hàng không thành công',
                );
              }
            } else {
              toast.error(
                'Đã xảy ra lỗi khi chỉnh sửa sản phẩm trong giỏ hàng',
              );
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div
      className={`${cx('wrapper-select-quantity')} d-flex align-items-center rounded`}
      // style={{ width: '110px' }}
    >
      <button
        type="button"
        className="d-flex align-items-center justify-content-center p-2 btn-dark btn"
        onClick={() => props.reduce()}
        style={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }}
      >
        <FontAwesomeIcon
          style={{ fontSize: '12px', color: '#000' }}
          icon={faSubtract as IconProp}
        />
      </button>
      <input
        type="number"
        className={`${cx('inp-number')} p-0 m-0`}
        value={props.quantity}
        onChange={handleChangeQuantityByKeyboard}
        min={1}
        max={props.max}
      />
      <button
        type="button"
        className="d-flex align-items-center justify-content-center p-2 btn-dark btn"
        disabled={props.quantity === props.max}
        onClick={() => props.add()}
        style={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }}
      >
        <FontAwesomeIcon
          style={{ fontSize: '12px', color: '#000' }}
          icon={faPlus as IconProp}
        />
      </button>
    </div>
  );
};

export default SelectQuantity;
