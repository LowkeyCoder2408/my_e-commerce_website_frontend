import classNames from 'classnames/bind';
import styles from '../scss/VNPayBankCard.module.scss';
import { Wifi } from '@mui/icons-material';

const cx = classNames.bind(styles);

const VNPayBankCard = () => {
  return (
    <div className={cx('card-box')}>
      <div className={cx('card-header')}>
        <div className={cx('card-name')}>
          <div className={cx('card-name__title')}>Credit Card</div>
        </div>
        <div className={cx('card-logo')}>
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1726751408/jukasbaqfqv1x8cktqk9.png"
            alt="ncb logo"
            width="130px"
            height="38px"
          />
        </div>
      </div>
      <div className={cx('card-chippart')}>
        <div className={cx('card-chip')}>
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1726752347/u8i4g59euli1io0yoc8h.png"
            alt="chip"
            width="38px"
            height="38px"
          />
        </div>
        <div className={cx('card-wifi')}>
          <Wifi />
        </div>
      </div>
      <div className={cx('card-cardno')}>970 4198 5261 9143 2198</div>
      <div className={cx('card-footer')}>
        <div className={cx('card-left')}>
          <h5>EXP-END: 07/15</h5>
          <h4>NGUYEN VAN A</h4>
        </div>
        <div className={cx('card-right')}>
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1726754997/gwwgukuz0jaactrjvd13.png"
            alt="mastercard"
            width="57px"
            height="34px"
          />
        </div>
      </div>
    </div>
  );
};

export default VNPayBankCard;
