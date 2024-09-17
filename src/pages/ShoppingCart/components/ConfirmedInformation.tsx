import FormatPrice from '../../../utils/Service/FormatPrice';
import { toast } from 'react-toastify';
import { isToken } from '../../../utils/Service/JwtService';
import { useNavigate } from 'react-router-dom';
import styles from '../scss/ConfirmedInformation.module.scss';
import classNames from 'classnames/bind';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const cx = classNames.bind(styles);

interface ConfirmedInformationProps {
  isCheckOut?: any;
  setIsCheckOut?: any;
  totalPrice: number;
}

const ConfirmedInformation = (props: ConfirmedInformationProps) => {
  const navigation = useNavigate();

  return (
    <>
      <div
        className="col col-xxl-4 col-xl-4 col-12"
        style={{ height: 'fit-content' }}
      >
        <div className="default-title mt-2">THÔNG TIN XÁC NHẬN</div>
        <div className={`${cx('confirm-information')} mt-4 bg-white px-4 py-5`}>
          <div className="d-flex align-items-center justify-content-between">
            <span>Thành tiền:</span>
            <span>
              <strong>
                {props.totalPrice && <FormatPrice price={props.totalPrice} />}
              </strong>
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <span>Phí giao hàng:</span>
            <span>
              <strong>{props.totalPrice && <FormatPrice price={0} />}</strong>
            </span>
          </div>
          <hr className="my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <span>
              <strong>Tổng cộng:</strong>
            </span>
            <span className="text-danger">
              <strong>
                {props.totalPrice && <FormatPrice price={props.totalPrice} />}
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
                  navigation('/check-out');
                  props.setIsCheckOut && props.setIsCheckOut(true);
                } else {
                  toast.warning('Bạn cần đăng nhập để thực hiện chức năng này');
                  navigation('/login');
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
                  onClick={() => navigation('/shopping-cart')}
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
