import styles from '../scss/MyOrderModal.module.scss';
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
import OrderStatus from './OrderStatus';
import { format } from 'date-fns';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Print } from '@mui/icons-material';

const cx = classNames.bind(styles);

interface OrderModalProps {
  order: OrderModel;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.1rem',
  color: '#007dc0',
}));

const MyOrderModal = (props: OrderModalProps) => {
  const handlePrint = () => {
    window.print();
  };

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
                {props.order.orderTracks?.map((orderTrack, index) => (
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
      </Box>
      <div className="my-5">
        <OrderStatus order={props.order} />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography
            color="primary"
            sx={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px' }}
          >
            CHI TIẾT ĐƠN HÀNG ORD-{props.order.id}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Ngày đặt hàng:</strong>{' '}
            {format(
              new Date(props.order.createdTime || 0),
              "dd/MM/yyyy, 'lúc' HH:mm:ss",
            )}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Phương thức thanh toán:</strong>{' '}
            {props.order.paymentMethodName}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Hình thức vận chuyển:</strong>{' '}
            {props.order.deliveryMethodName}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Ghi chú:</strong>{' '}
            {props.order.note ? `${props.order.note}` : 'Không có'}
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
            {props.order.fullName}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Email:</strong> {props.order.email}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Số điện thoại:</strong> {props.order.phoneNumber}
          </Typography>
          <Typography sx={{ marginY: '6px', fontSize: '1.5rem' }}>
            <strong>Địa chỉ nhận hàng:</strong> {props.order.addressLine},{' '}
            {props.order.ward}, {props.order.district}, {props.order.province}
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
            {props.order.orderDetails?.map((item, index) => (
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
                {props.order.totalPriceProduct?.toLocaleString('vi-VN')} ₫
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
                {props.order.deliveryFee?.toLocaleString('vi-VN')} ₫
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
                {props.order.totalPrice?.toLocaleString('vi-VN')} ₫
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" marginTop={3} justifyContent="flex-end">
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
    </Box>
  );
};

export default MyOrderModal;
