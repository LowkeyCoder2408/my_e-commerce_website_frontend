import { useEffect, useState } from 'react';
import { useCartItems } from '../../../utils/Context/CartItemContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import styles from '../scss/ProductCartList.module.scss';
import classNames from 'classnames/bind';
import { CheckOut } from '../../CheckOut/CheckOut';
import ConfirmedInformation from './ConfirmedInformation';
import CartItemList from './CartItemList';

const cx = classNames.bind(styles);

interface ProductCartItemsProps {}

const ProductCartItems: React.FC<ProductCartItemsProps> = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { cartItems } = useCartItems();

  const [totalPrice, setTotalPrice] = useState(0);
  const [isCheckOut, setIsCheckOut] = useState<boolean>(false);
  // const [isCheckOut, setIsCheckOut] = useState<boolean>(true);

  const navigation = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((totalPrice, cartItem) => {
      const itemQuantity = cartItem.quantity ?? 0;
      const itemPrice = cartItem.product?.currentPrice ?? 0;
      return totalPrice + itemQuantity * itemPrice;
    }, 0);

    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      {cartItems.length === 0 ? (
        <div
          style={{ marginTop: '50px' }}
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713619417/cart_empty_hxwhlc.png"
            alt=""
            width="30%"
          />
          <h2 className="mt-5 text-center" style={{ fontWeight: '550' }}>
            GIỎ HÀNG CỦA BẠN CHƯA CÓ SẢN PHẨM NÀO
          </h2>
          <Link to={'/product-list'} className="mt-5">
            <div
              className="btn btn-dark py-2 px-4"
              style={{ fontSize: '16px', fontWeight: '450' }}
            >
              MUA SẮM NGAY
            </div>
          </Link>
        </div>
      ) : (
        <>
          {isCheckOut === false ? (
            <div>
              <div
                className="row"
                style={
                  cartItems.length === 0
                    ? { display: 'none' }
                    : { display: 'flex' }
                }
              >
                <CartItemList canChangeQuantity={true} />
                <ConfirmedInformation
                  isCheckOut={isCheckOut}
                  totalPrice={totalPrice}
                />
              </div>
            </div>
          ) : (
            <CheckOut />
          )}
        </>
      )}
    </div>
  );
};

export default ProductCartItems;
