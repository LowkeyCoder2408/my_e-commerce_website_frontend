import styles from './scss/OrderModal.module.scss';
import OrderModel from '../../../models/OrderModel';
import classNames from 'classnames/bind';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Edit, Print } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { backendEndpoint } from '../../../utils/Service/Constant';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';
import { confirm } from 'material-ui-confirm';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { useAuth } from '../../../utils/Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderStatus from '../../../pages/Order/components/OrderStatus';
import OrderStatusModal from './OrderStatusModal';
import { FadeModal } from '../../../utils/FadeModal';

const cx = classNames.bind(styles);

interface OrderModalProps {
  orderId: number;
  fetchOrders: any;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.1rem',
  color: '#007dc0',
}));

const OrderModal = (props: OrderModalProps) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = useState<OrderModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openOrderStatusModal, setOpenOrderStatusModal] =
    useState<boolean>(false);
  const [keyCountReload, setKeyCountReload] = useState<number>(0);

  const handleOpenOrderStatusModal = () => {
    setOpenOrderStatusModal(true);
  };

  const handleCloseOrderStatusModal = () => {
    setOpenOrderStatusModal(false);
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${backendEndpoint}/orders/find-by-id/${props.orderId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Network response was not ok');
      }

      setIsLoading(false);
      const result = await response.json();
      setOrder(result);
    } catch (error) {
      console.log('Lỗi khi lấy đơn hàng: ', error);
    }
  };

  useEffect(() => {
    if (props.orderId !== 0) {
      fetchOrder();
    }
  }, [keyCountReload]);

  const handlePrint = () => {
    window.print();
  };

  const handleReturnRequest = () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để thêm vào giỏ hàng');
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

    confirm({
      title: <div className="default-title">GỬI YÊU CẦU TRẢ HÀNG</div>,
      description: (
        <span style={{ fontSize: '16px' }}>
          Bạn có chắc chắn rằng sẽ trả hàng?
        </span>
      ),
      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(() => {
        if (isLoggedIn) {
          fetch(backendEndpoint + `/orders/return-request/${props.orderId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
            .then(async (response) => {
              const data = await response.json();
              if (response.ok && data.status === 'success') {
                toast.success(
                  data.message || 'Gửi yêu cầu trả hàng thành công',
                );
                fetchOrder();
                props.fetchOrders();
              } else {
                toast.error(
                  data.message ||
                    'Gặp lỗi trong quá trình gửi yêu cầu trả hàng',
                );
              }
            })
            .catch((error) => {
              console.error(error);
              toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
            });
        } else {
          toast.error('Bạn cần đăng nhập để gửi yêu cầu trả hàng');
        }
      })
      .catch(() => {});
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" sx={{ marginBottom: '10px' }}>
        <Typography
          color="primary"
          sx={{ fontWeight: 'bold', fontSize: '2rem' }}
        >
          TRẠNG THÁI ĐƠN HÀNG
        </Typography>
        <Tooltip
          title={
            <>
              <ul style={{ fontSize: '1.4rem' }}>
                LỊCH SỬ THAY ĐỔI:
                {order?.orderTracks?.map((orderTrack, index) => (
                  <li key={index}>
                    -{' '}
                    <strong>
                      {format(
                        orderTrack.updatedTime ?? new Date(),
                        "HH':'mm':'ss, dd/MM/yyyy",
                      )}
                      :
                    </strong>{' '}
                    tình trạng đơn hàng đã được thay đổi thành{' '}
                    <strong>{(orderTrack.status || '').toUpperCase()}</strong>.
                  </li>
                ))}
              </ul>
            </>
          }
        >
          <IconButton
            sx={{
              backgroundColor: '#007dc0',
              color: '#fff',
              marginLeft: '12px',
              height: '17px',
              width: '17px',
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: '#005c99',
              },
            }}
          >
            ?
          </IconButton>
        </Tooltip>
        <IconButton
          sx={{
            color: '#007dc0',
            marginLeft: '12px',
            height: '17px',
            width: '17px',
            fontSize: '1.2rem',
          }}
          onClick={handleOpenOrderStatusModal}
        >
          <Edit />
        </IconButton>
      </Box>
      <div className="my-5">{order && <OrderStatus order={order} />}</div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography
            color="primary"
            sx={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px' }}
          >
            CHI TIẾT ĐƠN HÀNG ORD-{order?.id}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Ngày đặt hàng:</strong>{' '}
            {format(
              new Date(order?.createdTime || 0),
              "dd/MM/yyyy, 'lúc' HH:mm:ss",
            )}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Phương thức thanh toán:</strong> {order?.paymentMethodName}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Thời gian thanh toán:</strong>{' '}
            {order?.paidTime
              ? format(new Date(order?.paidTime), "dd/MM/yyyy, 'lúc' HH:mm:ss")
              : 'Chưa thanh toán'}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Hình thức vận chuyển:</strong> {order?.deliveryMethodName}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Ghi chú:</strong>{' '}
            {order?.note ? `${order?.note}` : 'Không có'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            color="primary"
            sx={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px' }}
          >
            THÔNG TIN NHẬN HÀNG
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Tên khách hàng (ghi trong hóa đơn):</strong>{' '}
            {order?.fullName}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Email:</strong> {order?.email}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Số điện thoại:</strong> {order?.phoneNumber}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Địa chỉ nhận hàng:</strong> {order?.addressLine},{' '}
            {order?.ward}, {order?.district}, {order?.province}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Thời gian giao hàng:</strong>{' '}
            {order?.deliveredTime
              ? format(
                  new Date(order?.deliveredTime),
                  "dd/MM/yyyy, 'lúc' HH:mm:ss",
                )
              : 'Chưa giao'}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <TableContainer component={Paper} sx={{ marginBottom: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontSize: '1.6rem' }}>
                Tên sản phẩm
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: '1.6rem' }}>
                Đơn giá
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: '1.6rem' }}>
                Số lượng
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: '1.6rem' }}>
                Tổng
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order?.orderDetails?.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontSize: '1.6rem',
                    textAlign: 'left !important',
                    fontWeight: '400',
                    lineHeight: '2.5rem',
                  }}
                  width={650}
                >
                  {item.product.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '1.6rem',
                    textAlign: 'center !important',
                    fontWeight: '400',
                    lineHeight: '2.5rem',
                  }}
                  width={150}
                >
                  {item.productPriceAtOrderTime.toLocaleString('vi-VN')} ₫
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '1.6rem',
                    textAlign: 'center !important',
                    fontWeight: '400',
                    lineHeight: '2.5rem',
                  }}
                  width={120}
                >
                  {item.quantity}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '1.6rem',
                    textAlign: 'center !important',
                    lineHeight: '2.5rem',
                  }}
                >
                  {item.subtotal.toLocaleString('vi-VN')} ₫
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.6rem',
                  textAlign: 'right !important',
                }}
              >
                Tổng phụ
              </TableCell>
              <TableCell sx={{ fontSize: '1.6rem', fontWeight: '550' }}>
                {order?.totalPriceProduct?.toLocaleString('vi-VN')} ₫
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.6rem',
                  textAlign: 'right !important',
                }}
              >
                Phí vận chuyển
              </TableCell>
              <TableCell sx={{ fontSize: '1.6rem', fontWeight: '550' }}>
                {order?.deliveryFee?.toLocaleString('vi-VN')} ₫
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.6rem',
                  textAlign: 'right !important',
                }}
              >
                Tổng cộng
              </TableCell>
              <TableCell
                sx={{ fontSize: '1.6rem', fontWeight: '550', color: 'red' }}
              >
                {order?.totalPrice?.toLocaleString('vi-VN')} ₫
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" gap={2} marginTop={3} justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Print />}
          sx={{ fontSize: '1.4rem' }}
          onClick={handlePrint}
        >
          In đơn hàng
        </Button>
      </Box>
      {order && (
        <FadeModal
          open={openOrderStatusModal}
          handleOpen={handleOpenOrderStatusModal}
          handleClose={handleCloseOrderStatusModal}
        >
          <OrderStatusModal
            order={order}
            setKeyCountReload={setKeyCountReload}
            handleCloseOrderStatusModal={handleCloseOrderStatusModal}
          />
        </FadeModal>
      )}
    </Box>
  );
};

export default OrderModal;
