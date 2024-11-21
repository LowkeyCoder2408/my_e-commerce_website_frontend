import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { toast } from 'react-toastify';
import OrderModel from '../../../models/OrderModel';
import { backendEndpoint } from '../../../utils/Service/Constant';
import OrderStatus from '../../../pages/Order/components/OrderStatus';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { useAuth } from '../../../utils/Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface OrderStatusModalProps {
  order: OrderModel;
  setKeyCountReload: Dispatch<SetStateAction<number>>;
  handleCloseOrderStatusModal: any;
}

function OrderStatusModal(props: OrderStatusModalProps) {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedStatus, setSelectedStatus] = useState<string>(
    props.order.status || '',
  );
  const [orderStatuses, setOrderStatuses] = useState<
    { status: string; description: string }[]
  >([]);

  useEffect(() => {
    const fetchOrderStatuses = async () => {
      try {
        const response = await fetch(
          `${backendEndpoint}/order-status/descriptions`,
        );
        if (!response.ok) {
          throw new Error('Không thể tải danh sách trạng thái đơn hàng');
        }
        const data = await response.json();
        setOrderStatuses(data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách trạng thái:', error);
        toast.error('Không thể tải danh sách trạng thái đơn hàng');
      }
    };

    fetchOrderStatuses();
  }, []);

  const handleStatusChange = async (event: SelectChangeEvent<string>) => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
      navigate('/admin/login', { state: { from: location } });
      return;
    }

    if (isTokenExpired()) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      toast.error(
        'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục',
      );
      navigate('/admin/login', { state: { from: location } });
      return;
    }

    setSelectedStatus(event.target.value);

    try {
      const endpoint = `/orders/update-order`;
      const response = await fetch(backendEndpoint + endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: props.order.id,
          status: event.target.value,
        }),
      });

      const data = await response.json(); // Chờ và lấy dữ liệu từ phản hồi

      if (response.ok && data.status === 'success') {
        toast.success(
          data.message || 'Cập nhật tình trạng đơn hàng thành công',
        );
        props.setKeyCountReload && props.setKeyCountReload(Math.random());
        props.handleCloseOrderStatusModal &&
          props.handleCloseOrderStatusModal();
      } else {
        toast.error(
          data.message || 'Cập nhật tình trạng đơn hàng không thành công',
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi cập nhật trạng thái');
    }
  };

  return (
    <>
      <div className="default-title">TÌNH TRẠNG ĐƠN HÀNG</div>
      <div className="my-5">
        <OrderStatus order={props.order} />
      </div>
      <h2 className="mt-5">CẬP NHẬT TÌNH TRẠNG ĐƠN HÀNG</h2>
      <FormControl fullWidth variant="standard">
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{ fontSize: '1.5rem' }}
        >
          Tình trạng đơn hàng
        </InputLabel>
        <Select
          required
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          variant="standard"
          value={selectedStatus}
          onChange={handleStatusChange}
          sx={{
            '& .MuiSelect-select': {
              fontSize: '1.6rem',
              fontWeight: '500',
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {orderStatuses.map(({ status, description }) => (
            <MenuItem key={description} value={description}>
              {description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default OrderStatusModal;
