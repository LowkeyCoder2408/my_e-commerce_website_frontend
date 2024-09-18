import FormatPrice from '../../../utils/Service/FormatPrice';
import { toast } from 'react-toastify';
import { isToken } from '../../../utils/Service/JwtService';
import { useNavigate } from 'react-router-dom';
import styles from '../scss/ConfirmedInformation.module.scss';
import classNames from 'classnames/bind';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';

const cx = classNames.bind(styles);

interface ConfirmedInformationProps {
  isCheckOut?: any;
  setIsCheckOut?: any;
  totalPriceProduct: number;
  deliveryFee?: number;
}

const ConfirmedInformation = (props: ConfirmedInformationProps) => {
  const navigate = useNavigate();
  const totalPrice = props.totalPriceProduct + (props.deliveryFee || 0);

  return (
    <>
      <div
        className="col col-xxl-4 col-xl-4 col-12"
        style={{ height: 'fit-content' }}
      >
        <div className="default-title mt-2">THÔNG TIN XÁC NHẬN</div>
        <div className={`${cx('confirm-information')} mt-4 bg-white px-4 py-5`}>
          <div className="d-flex align-items-center justify-content-between">
            <span>Thành tiền (chỉ tính sản phẩm):</span>
            <span>
              <strong>
                <FormatPrice price={props.totalPriceProduct} />
              </strong>
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <span>Phí giao hàng:</span>
            <span>
              <strong>
                {props.deliveryFee ? (
                  <FormatPrice price={props.deliveryFee} />
                ) : (
                  <>Chưa xác định</>
                )}
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
                <FormatPrice price={totalPrice} />
              </strong>
            </span>
          </div>
          {!props.isCheckOut && (
            <div
              className={`${cx('confirm-information-btn')} btn w-100 py-2 mt-4`}
              style={{
                fontSize: '1.4rem',
                background: '#3b71ca',
                color: '#fff',
              }}
              onClick={() => {
                if (isToken()) {
                  navigate('/check-out');
                  props.setIsCheckOut && props.setIsCheckOut(true);
                } else {
                  toast.warning('Bạn cần đăng nhập để thực hiện chức năng này');
                  navigate('/login');
                }
              }}
            >
              ĐẶT HÀNG NGAY
            </div>
          )}
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
          {props.isCheckOut && (
            <>
              <div className="col d-flex align-items-center mt-4">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/shopping-cart')}
                >
                  <ArrowBackIcon />
                  <strong className="ms-2">Quay về giỏ hàng</strong>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmedInformation;
