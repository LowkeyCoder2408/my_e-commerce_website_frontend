import { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import AdminRequirement from '../../../utils/AdminRequirement';
import {
  getUserIdByToken,
  isTokenExpired,
} from '../../../utils/Service/JwtService';
import { useAuth } from '../../../utils/Context/AuthContext';
import OrderModel from '../../../models/OrderModel';
import { backendEndpoint } from '../../../utils/Service/Constant';
import FormatPrice from '../../../utils/Service/FormatPrice';
import Loader from '../../../utils/Loader';
import { DataTable } from '../../../utils/DataTable';
import { FadeModal } from '../../../utils/FadeModal';
import OrderModal from './OrderModal';

const OrderManagement = () => {
  const userId = getUserIdByToken();

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [orders, setOrders] = useState<OrderModel[]>([]);
  // Xử lý order table
  const [orderId, setOrderId] = useState<number>(0);
  const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);

  const fetchOrders = () => {
    if (userId) {
      fetch(backendEndpoint + `/orders`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data: OrderModel[]) => {
          setIsLoading(false);
          const orders: OrderModel[] = data.map((order: OrderModel) => ({
            ...order,
          }));

          const ordersSort = orders.sort(
            (order1: OrderModel, order2: OrderModel) => order1.id - order2.id,
          );

          setOrders(ordersSort);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    fetchOrders();
  }, []);

  const handleOpenOrderModal = () => setOpenOrderModal(true);
  const handleCloseOrderModal = () => {
    setOrderId(0);
    setOpenOrderModal(false);
  };

  const handleCancelAnOrder = (orderId: number) => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để thêm vào giỏ hàng');
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

    confirm({
      title: <div className="default-title">HỦY ĐƠN HÀNG ORD-{orderId}</div>,
      description: (
        <span style={{ fontSize: '16px' }}>
          Bạn có chắc chắn rằng sẽ hủy đơn hàng này?
        </span>
      ),
      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(() => {
        if (isLoggedIn) {
          fetch(backendEndpoint + `/orders/cancel-order/${orderId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
            .then(async (response) => {
              const data = await response.json();
              if (response.ok && data.status === 'success') {
                toast.success(data.message || 'Hủy đơn hàng thành công');
                fetchOrders();
                setOrderId(0);
              } else {
                toast.error(
                  data.message || 'Gặp lỗi trong quá trình hủy đơn hàng',
                );
              }
            })
            .catch((error) => {
              console.error(error);
              toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
            });
        } else {
          toast.error('Bạn cần đăng nhập để hủy đơn hàng');
        }
      })
      .catch(() => {});
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã đơn',
      width: 70,
      renderCell: (params) => {
        return <div className="text-center">{params.value}</div>;
      },
    },
    { field: 'fullName', headerName: 'Tên khách hàng', width: 170 },
    {
      field: 'createdTime',
      headerName: 'Thời gian khởi tạo',
      width: 160,
      renderCell: (params) => {
        const dateValue = new Date(params.value);
        if (isNaN(dateValue.getTime())) {
          return <div className="text-center">Không xác định</div>;
        }
        const formattedDateTime = format(dateValue, 'HH:mm:ss, dd/MM/yyyy');
        return <div className="text-center">{formattedDateTime}</div>;
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: (params) => {
        return <div className="text-center">{params.value}</div>;
      },
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      width: 110,
      renderCell: (params) => {
        return <div className="text-center">{params.value}</div>;
      },
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng tiền',
      width: 130,
      renderCell: (params) => {
        return (
          <div
            className="text-center"
            style={{ color: 'rgb(231, 0, 0)', fontWeight: '600' }}
          >
            <FormatPrice price={params.value} />
          </div>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái đơn',
      width: 170,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case 'Vừa khởi tạo':
            color = '#007BFF';
            break;
          case 'Đang xử lý':
            color = '#FFC107';
            break;
          case 'Đã đóng gói':
            color = '#20C997';
            break;
          case 'Shipper đã nhận hàng':
            color = '#FD7E14';
            break;
          case 'Đang giao hàng':
            color = '#17A2B8';
            break;
          case 'Đã được giao':
            color = '#28A745';
            break;
          case 'Đã bị hủy':
            color = '#6C757D';
            break;
          case 'Đã thanh toán':
            color = 'rgb(200, 173, 0)';
            break;
          case 'Yêu cầu hoàn trả':
            color = 'rgb(180, 56, 84)';
            break;
          case 'Đã hoàn trả':
            color = 'rgb(62, 158, 178)';
            break;
          default:
            color = '#000';
        }

        return (
          <div className="text-center">
            <strong
              style={{
                color: `${color}`,
                border: `2px solid ${color}`,
                padding: '6px',
                borderRadius: '50px',
                transform: 'rotate(-15deg)',
              }}
            >
              {params.value}
            </strong>
          </div>
        );
      },
    },
    {
      field: 'paymentMethodName',
      headerName: 'Cách thanh toán',
      width: 130,
      renderCell: (params) => {
        return (
          <div
            className="text-center"
            style={{
              fontStyle: 'italic',
              color: '#949424',
            }}
          >
            {params.value || 'Không xác định'}
          </div>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Các thao tác',
      width: 110,
      type: 'actions',
      renderCell: (item) => {
        return (
          <div className="d-flex gap-2">
            <div
              style={{
                cursor: 'pointer',
                padding: '10px',
                color: '#4646a1',
                display: 'flex',
                gap: '20px',
              }}
            >
              <FontAwesomeIcon
                title="Xem chi tiết đơn hàng"
                onClick={() => {
                  setOrderId(Number(item.id));
                  handleOpenOrderModal();
                }}
                icon={faEye as IconProp}
              />
            </div>
            <div
              style={{
                cursor: 'pointer',
                padding: '10px',
                color: 'red',
                display: 'flex',
                gap: '20px',
              }}
            >
              <FontAwesomeIcon
                title="Hủy đơn hàng"
                onClick={() => {
                  setOrderId(Number(item.id));
                  handleCancelAnOrder(Number(item.id));
                }}
                icon={faTimesCircle as IconProp}
              />
            </div>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      <DataTable title="Danh sách đơn hàng" columns={columns} rows={orders} />
      <FadeModal
        open={openOrderModal}
        handleOpen={handleOpenOrderModal}
        handleClose={handleCloseOrderModal}
      >
        <OrderModal orderId={orderId} fetchOrders={fetchOrders} />
      </FadeModal>
    </div>
  );
};

const OrderManagementPage = AdminRequirement(OrderManagement);
export default OrderManagementPage;