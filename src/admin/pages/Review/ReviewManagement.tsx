import { GridColDef } from '@mui/x-data-grid';
import AdminRequirement from '../../../utils/AdminRequirement';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DataTable } from '../../../utils/DataTable';
import { useEffect, useState } from 'react';
import ReviewModel from '../../../models/ReviewModel';
import Loader from '../../../utils/Loader';
import { backendEndpoint } from '../../../utils/Service/Constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import { Avatar } from '@mui/material';
import { confirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { getAllReviews } from '../../../api/ReviewAPI';

const ReviewManagement = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [keyCountReload, setKeyCountReload] = useState<number>(0);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#1890ff',
          ...theme.applyStyles('dark', {
            backgroundColor: '#177ddc',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255,255,255,.35)',
      }),
    },
  }));

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã',
      width: 50,
      renderCell: (params) => {
        return <div className="text-center">{params.value}</div>;
      },
    },
    {
      field: 'rating',
      headerName: 'Đánh giá',
      width: 80,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center gap-1 justify-content-center">
            {params.value}
            <FontAwesomeIcon
              icon={faStar as IconProp}
              style={{
                fontSize: '1.2rem',
                color: '#f5c31a',
                marginBottom: '2px',
              }}
            />
          </div>
        );
      },
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      width: 400,
    },
    {
      field: 'authorName',
      headerName: 'Tên tác giả',
      width: 100,
      renderCell: (params) => {
        return <div className="text-center">{params.row.userFullName}</div>;
      },
    },
    {
      field: 'reviewTime',
      headerName: 'Thời gian bình luận',
      width: 200,
      renderCell: (params) => {
        const dateValue = new Date(params.value);
        if (!params.value) {
          return <div className="text-center">Không xác định</div>;
        }
        const formattedDateTime = format(dateValue, 'HH:mm:ss, dd/MM/yyyy');
        return <div className="text-center">{formattedDateTime}</div>;
      },
    },
    {
      field: 'productName',
      headerName: 'Tên sản phẩm',
      width: 400,
      renderCell: (params) => {
        return <div className="text-center">{params.row.productName}</div>;
      },
    },
  ];

  const fetchReviews = () => {
    getAllReviews()
      .then((data) => {
        setIsLoading(false);
        setReviews(data);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteReview = async (reviewId: number) => {
    confirm({
      title: <div className="default-title">XÓA BÌNH LUẬN</div>,
      description: (
        <span style={{ fontSize: '16px' }}>
          Bạn có đồng ý là sẽ xóa bình luận này
        </span>
      ),

      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(async () => {
        if (!isLoggedIn) {
          toast.error('Bạn phải đăng nhập để xóa bình luận này');
          navigate('/admin/login', {
            state: { from: location },
          });
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

        const response = await fetch(
          backendEndpoint + `/reviews/delete-review/${reviewId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'content-type': 'application/json',
            },
          },
        );

        const data = await response.json();

        if (response.ok && data.status === 'success') {
          toast.success(data.message || 'Xóa bình luận thành công');
          setKeyCountReload(Math.random());
        } else {
          toast.error(data.message || 'Đã xảy ra lỗi khi xóa bình luận này');
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchReviews();
  }, [keyCountReload]);

  if (isLoading) {
    return <Loader isAdmin />;
  }

  return (
    <div className="container mt-5">
      <DataTable title="Danh sách bình luận" columns={columns} rows={reviews} />
    </div>
  );
};

const ReviewManagementPage = AdminRequirement(ReviewManagement);
export default ReviewManagementPage;
