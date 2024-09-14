import ProductCartCard from './ProductCartCard';
import { useCartItems } from '../../../utils/Context/CartItemContext';
import styles from '../scss/CartItemList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface CartItemListProps {
  canChangeQuantity: boolean;
}

const CartItemList = (props: CartItemListProps) => {
  const { cartItems } = useCartItems();

  return (
    <>
      <div className="container col col-xxl-8 col-xl-8 col-12">
        <div className="default-title mt-5">CÁC SẢN PHẨM TRONG GIỎ HÀNG</div>
        <div className={`${cx('cart-items-container')} mt-4 overflow-x-scroll`}>
          {cartItems.map((cartItem) => {
            return (
              <ProductCartCard
                cartItem={cartItem}
                canChangeQuantity={props.canChangeQuantity}
                key={cartItem.product.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CartItemList;
