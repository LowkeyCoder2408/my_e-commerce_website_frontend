import ProductModel from '../../../models/ProductModel';
import styles from '../scss/BuyNowProductInformation.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface BuyNowProductInformationProps {
  product: ProductModel;
}

const BuyNowProductInformation = (props: BuyNowProductInformationProps) => {
  return (
    <>
      <div className="container col col-xxl-8 col-xl-8 col-12">
        <div className="default-title mt-2">
          THÔNG TIN SẢN PHẨM SẼ THANH TOÁN
        </div>
        <div className={`${cx('cart-items-container')} mt-4 overflow-x-scroll`}>
          {props.product.id} + {props.product.quantity}
        </div>
      </div>
    </>
  );
};

export default BuyNowProductInformation;
