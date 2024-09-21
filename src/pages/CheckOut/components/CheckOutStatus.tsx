import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CheckOutSuccess } from './CheckOutSuccess';
import { CheckOutFailure } from './CheckOutFailure';
import { useAuth } from '../../../utils/Context/AuthContext';
import Loader from '../../../utils/Loader';
import { handleSaveOrder } from '../../../api/OrderAPI';
import { toast } from 'react-toastify';
import { backendEndpoint } from '../../../utils/Service/Constant';
import { useCartItems } from '../../../utils/Context/CartItemContext';

const CheckOutStatus: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { fetchCartItems } = useCartItems();
  const { isLoggedIn } = useAuth();
  const params = new URLSearchParams(location.search);

  const [isSuccessPayment, setIsSuccessPayment] = useState<boolean | null>(
    null,
  );
  const responseCode = params.get('vnp_ResponseCode') || null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const requestString = localStorage.getItem('order_request');
    const request = JSON.parse(requestString || '{}');

    if (responseCode) {
      fetch(
        backendEndpoint +
          `/vn-pay/payment-result?vnp_ResponseCode=${responseCode}`,
      )
        .then(async (response) => {
          if (!response.ok) {
            throw new Error('Không thể lấy kết quả thanh toán');
          }
          const data = await response.json();

          if (data.result === 'success') {
            if (requestString) {
              await handleSaveOrder(request, fetchCartItems);
            }
            setIsSuccessPayment(true);
          } else {
            setIsSuccessPayment(false);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('Có lỗi xảy ra khi xử lý thanh toán');
          setIsSuccessPayment(false);
        });
    }

    return () => {
      localStorage.removeItem('order_request');
    };
  }, [isLoggedIn, navigate, responseCode]);

  if (isSuccessPayment === null) {
    return <Loader />;
  }

  // Phần còn lại của mã không thay đổi
  const transactionDetails = {
    responseCode: getTransactionMessage(responseCode || ''),
    transactionNo: params.get('vnp_TransactionNo') || null,
    bankCode: params.get('vnp_BankCode') || null,
    amount: params.get('vnp_Amount')
      ? `${(parseInt(params.get('vnp_Amount') || '0') / 100).toLocaleString('vi-VN')} đồng`
      : null,
    payDate: formatPayDate(params.get('vnp_PayDate')) || null,
    orderInfo: params.get('vnp_OrderInfo') || null,
    cardType: params.get('vnp_CardType') || null,
  };

  return (
    <div className="container">
      {isSuccessPayment ? <CheckOutSuccess /> : <CheckOutFailure />}
      <TableContainer component={Paper} style={{ marginTop: '30px' }}>
        <Table
          sx={{ minWidth: 650, borderCollapse: 'collapse' }}
          aria-label="transaction details table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{
                  fontSize: '1.7rem',
                  padding: '12px 20px',
                  textAlign: 'left !important',
                  fontWeight: 'bold',
                  color: isSuccessPayment ? '#4b6a44' : '#dc3545',
                  backgroundColor: isSuccessPayment ? '#dbf0d2' : '#f8d7da',
                }}
              >
                THÔNG TIN THANH TOÁN TRỰC TUYẾN TẠI VNPAY
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: '1.7rem',
                  padding: '10px 20px',
                  border: 'none !important',
                  textAlign: 'left !important',
                }}
              >
                Thông tin
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1.7rem',
                  padding: '12px 20px',
                  border: 'none !important',
                  textAlign: 'left !important',
                }}
              >
                Giá trị
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1.7rem',
                  padding: '12px 20px',
                  border: 'none !important',
                  textAlign: 'left !important',
                }}
              >
                Mô tả
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(transactionDetails).reduce<JSX.Element[]>(
              (acc, [key, value]) => {
                if (!value) return acc;

                const rowBackgroundColor =
                  acc.length % 2 === 0 ? '#e6e6e6' : 'white';

                acc.push(
                  <TableRow
                    key={key}
                    sx={{
                      backgroundColor: rowBackgroundColor,
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontSize: '1.7rem',
                        padding: '5px 20px',
                        textAlign: 'left !important',
                        border: 'none !important',
                      }}
                    >
                      {formatLabel(key)}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '1.7rem',
                        padding: '5px 20px',
                        textAlign: 'left !important',
                        border: 'none !important',
                      }}
                    >
                      {value}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '1.7rem',
                        padding: '5px 20px',
                        textAlign: 'left !important',
                        border: 'none !important',
                      }}
                    >
                      {getDescription(key)}
                    </TableCell>
                  </TableRow>,
                );
                return acc;
              },
              [],
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const formatLabel = (key: string) => {
  switch (key) {
    case 'transactionNo':
      return 'Mã giao dịch';
    case 'orderInfo':
      return 'Thông tin đơn hàng';
    case 'amount':
      return 'Số tiền';
    case 'bankCode':
      return 'Mã ngân hàng';
    case 'cardType':
      return 'Loại thẻ';
    case 'payDate':
      return 'Ngày thanh toán';
    case 'responseCode':
      return 'Trạng thái giao dịch';
    default:
      return key;
  }
};

const getDescription = (key: string) => {
  switch (key) {
    case 'transactionNo':
      return 'Mã định danh giao dịch từ ngân hàng';
    case 'orderInfo':
      return 'Thông tin chi tiết về đơn hàng đã thanh toán';
    case 'amount':
      return 'Số tiền đã được thanh toán';
    case 'bankCode':
      return 'Mã ngân hàng mà giao dịch được thực hiện';
    case 'cardType':
      return 'Loại thẻ được sử dụng để thanh toán';
    case 'payDate':
      return 'Ngày và giờ thực hiện giao dịch';
    case 'responseCode':
      return 'Trạng thái của giao dịch (thành công, thất bại,...)';
    default:
      return '';
  }
};

const formatPayDate = (payDate: string | null) => {
  if (!payDate) return '';
  const year = payDate.slice(0, 4);
  const month = payDate.slice(4, 6);
  const day = payDate.slice(6, 8);
  const hour = payDate.slice(8, 10);
  const minute = payDate.slice(10, 12);
  const second = payDate.slice(12, 14);

  return `${day}/${month}/${year}, lúc ${hour}:${minute}:${second}`;
};

const getTransactionMessage = (responseCode: string): string => {
  switch (responseCode) {
    case '00':
      return 'Giao dịch thành công';
    case '07':
      return 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)';
    case '09':
      return 'Thẻ/tài khoản chưa đăng ký dịch vụ InternetBanking tại ngân hàng';
    case '10':
      return 'Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần';
    case '11':
      return 'Đã hết hạn chờ thanh toán';
    case '12':
      return 'Thẻ/tài khoản bị khóa';
    case '13':
      return 'Quý khách nhập sai OTP';
    case '24':
      return 'Khách hàng hủy giao dịch';
    case '51':
      return 'Tài khoản của quý khách không đủ số dư để thực hiện giao dịch';
    case '65':
      return 'Tài khoản của quý khách đã vượt quá hạn mức giao dịch trong ngày';
    case '75':
      return 'Ngân hàng thanh toán đang bảo trì';
    case '79':
      return 'KH nhập sai mật khẩu thanh toán quá số lần quy định';
    case '99':
      return 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)';
    case '02':
      return 'Merchant không hợp lệ (kiểm tra lại vnp_TmnCode)';
    case '03':
      return 'Dữ liệu gửi sang không đúng định dạng';
    case '91':
      return 'Không tìm thấy giao dịch yêu cầu';
    case '94':
      return 'Yêu cầu bị trùng lặp trong thời gian giới hạn của API (Giới hạn trong 5 phút)';
    case '97':
      return 'Chữ ký không hợp lệ';
    case '98':
      return 'Timeout Exception';
    case '04':
      return 'Không cho phép hoàn trả toàn phần sau khi hoàn trả một phần';
    case '93':
      return 'Số tiền hoàn trả không hợp lệ (phải nhỏ hơn hoặc bằng số tiền thanh toán)';
    case '95':
      return 'Giao dịch này không thành công bên VNPAY. VNPAY từ chối xử lý yêu cầu';
    default:
      return 'Giao dịch thất bại';
  }
};

export default CheckOutStatus;
