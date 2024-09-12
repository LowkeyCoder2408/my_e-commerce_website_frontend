import { useEffect, useState } from 'react';
import { useCartItems } from '../../../utils/Context/CartItemContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isToken } from '../../../utils/Service/JwtService';
import FormatPrice from '../../../utils/Service/FormatPrice';
import ProductCartCard from './ProductCartCard';
import { useAuth } from '../../../utils/Context/AuthContext';
import styles from '../scss/ProductCartList.module.scss';
import classNames from 'classnames/bind';
import CheckOut from '../../CheckOut/CheckOut';

const cx = classNames.bind(styles);

interface ProductCartItemsProps {}

const ProductCartItems: React.FC<ProductCartItemsProps> = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { cartItems, fetchCartItems } = useCartItems();

  const [totalPriceProduct, setTotalPriceProduct] = useState(0);
  const [isCheckOut, setIsCheckOut] = useState(false);

  const navigation = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((totalPrice, cartItem) => {
      const itemQuantity = cartItem.quantity ?? 0;
      const itemPrice = cartItem.product?.currentPrice ?? 0;
      return totalPrice + itemQuantity * itemPrice;
    }, 0);

    setTotalPriceProduct(total);
  }, [cartItems]);

  // function handleRemoveProduct(idProduct: number) {
  //   if (!isLoggedIn) {
  //     toast.error('Bạn cần đăng nhập để thêm vào giỏ hàng');
  //     navigation('/login', { state: { from: location } });
  //     return;
  //   }

  //   if (isTokenExpired()) {
  //     localStorage.removeItem('token');
  //     setIsLoggedIn(false);
  //     toast.error(
  //       'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục',
  //     );
  //     navigation('/login', { state: { from: location } });
  //     return;
  //   }

  //   const newCartItems = cartItems.filter(
  //     (cartItem) => cartItem.product.id !== idProduct,
  //   );
  //   localStorage.setItem('cart', JSON.stringify(newCartItems));
  //   toast.success('Xoá sản phẩm thành công');
  // }

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
          {!isCheckOut ? (
            <div>
              <div
                className="row"
                style={
                  cartItems.length === 0
                    ? { display: 'none' }
                    : { display: 'flex' }
                }
              >
                <div className="col col-xxl-8 col-xl-8 col-12">
                  <div className="default-title mt-3">
                    CÁC SẢN PHẨM TRONG GIỎ HÀNG
                  </div>
                  <div
                    className={`${cx('cart-items-container')} mt-4 overflow-x-scroll`}
                  >
                    {cartItems.map((cartItem) => {
                      return (
                        <ProductCartCard
                          cartItem={cartItem}
                          canChangeQuantity={true}
                          key={cartItem.product.id}
                        />
                      );
                    })}
                  </div>
                </div>
                <div
                  className="col col-xxl-4 col-xl-4 col-12"
                  style={{ height: 'fit-content' }}
                >
                  <div className="default-title mt-3">THÔNG TIN XÁC NHẬN</div>
                  <div
                    className={`${cx('confirm-information')} mt-4 bg-white px-4 py-5`}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span>Thành tiền:</span>
                      <span>
                        <strong>
                          {totalPriceProduct && (
                            <FormatPrice price={totalPriceProduct} />
                          )}
                        </strong>
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <span>Phí giao hàng:</span>
                      <span>
                        <strong>
                          {totalPriceProduct && <FormatPrice price={0} />}
                        </strong>
                      </span>
                    </div>
                    <hr className="my-3" />
                    <div className="d-flex align-items-center justify-content-between">
                      <span>
                        <strong>Tổng cộng:</strong>
                      </span>
                      <span className="text-danger">
                        <strong>
                          {totalPriceProduct && (
                            <FormatPrice price={totalPriceProduct} />
                          )}
                        </strong>
                      </span>
                    </div>
                    <div
                      className={`${cx('confirm-information-btn')} btn w-100 py-2 mt-4`}
                      style={{
                        fontSize: '1.4rem',
                        background: '#3b71ca',
                        color: '#fff',
                      }}
                      onClick={() => {
                        if (isToken()) {
                          setIsCheckOut(true);
                        } else {
                          toast.warning(
                            'Bạn cần đăng nhập để thực hiện chức năng này',
                          );
                          navigation('/login');
                        }
                      }}
                    >
                      ĐẶT HÀNG NGAY
                    </div>
                    <div className="mt-4">
                      Tech Hub hỗ trợ các phương thức thanh toán:
                      <div
                        className={`${cx('confirm-information__payment-method')} d-flex gap-3 mt-2`}
                      >
                        <img
                          src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713686301/cod_payment_owh4ih.png"
                          alt=""
                        />
                        <img
                          src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713686269/visa_payment_bbuee2.png"
                          alt=""
                        />
                        <img
                          src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713686269/vnpay_payment_p5eiis.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <CheckOut
            // setIsCheckOut={setIsCheckOut}
            // cartItems={cartItems}
            // totalPriceProduct={totalPriceProduct}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductCartItems;
