import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const CheckOutFailure = () => {
  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <div className="d-flex align-items-center justify-content-center flex-column p-5">
        <img
          className="mb-2"
          src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713963380/paid_unsuccess_gsddcp.png"
          alt="unsuccess"
          style={{ width: '300px' }}
        />
        <h2 className="mt-5 mb-3 text-center text-danger">
          Thanh toán không thành công
        </h2>
        <p className="mb-4 text-center">
          Đơn hàng của bạn đã gặp vấn đề trong quá trình xử lý!
        </p>
        <Link to={'/product-list'} className="mt-5">
          <div
            className="btn btn-dark py-2 px-4"
            style={{ fontSize: '16px', fontWeight: '450' }}
          >
            TIẾP TỤC MUA SẮM
          </div>
        </Link>
      </div>
    </div>
  );
};
