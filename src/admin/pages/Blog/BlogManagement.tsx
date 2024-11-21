import { GridColDef } from '@mui/x-data-grid';
import AdminRequirement from '../../../utils/AdminRequirement';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DataTable } from '../../../utils/DataTable';
import { useEffect, useState } from 'react';
import BlogModel from '../../../models/BlogModel';
import Loader from '../../../utils/Loader';
import { backendEndpoint } from '../../../utils/Service/Constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import { Avatar } from '@mui/material';
import { confirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { getAllBlogsNoFilter } from '../../../api/BlogAPI';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const BlogManagement = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [keyCountReload, setKeyCountReload] = useState<number>(0);
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
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
      field: 'featuredImage',
      headerName: 'Ảnh',
      width: 50,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Avatar
              style={{
                width: '35px',
                height: '35px',
                border: '1px solid #000',
              }}
              src={params.value}
            />
          </div>
        );
      },
    },
    {
      field: 'title',
      headerName: 'Tiêu đề',
      width: 135,
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      width: 200,
      renderCell: (params) => {
        const textContent =
          new DOMParser()
            .parseFromString(params.value?.toString() || '', 'text/html')
            .documentElement.textContent?.trim() || '';
        return <>{textContent}</>;
      },
    },
    {
      field: 'category',
      headerName: 'Danh mục bài đăng',
      width: 150,
      renderCell: (params) => {
        return (
          <div className="text-center">{params.row.blogCategory.name}</div>
        );
      },
    },
    {
      field: 'authorName',
      headerName: 'Tên tác giả',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="text-center">
            {params.row.author.firstName + ' ' + params.row.author.lastName}
          </div>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: 'Ngày đăng',
      width: 150,
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
      field: 'updatedAt',
      headerName: 'Chỉnh sửa lần cuối',
      width: 150,
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
      field: 'likesCount',
      headerName: 'Lượt thích',
      width: 85,
      renderCell: (params) => {
        console.log(params.row);
        return <div className="text-center">{params.row.likesCount}</div>;
      },
    },
    {
      field: 'enabled',
      headerName: 'Duyệt',
      width: 75,
      renderCell: (params) => {
        return (
          <div className="text-center h-100 d-flex align-items-center justify-content-center">
            <AntSwitch
              checked={params.value}
              onChange={(e) => {
                // handleChangeActiveState(params.row.id, e.);
              }}
              inputProps={{ 'aria-label': 'ant design' }}
            />
          </div>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 80,
      type: 'actions',
      renderCell: (item) => {
        return (
          <div className="d-flex gap-1">
            <div
              style={{
                fontSize: '1.3rem',
                cursor: 'pointer',
                padding: '5px',
                color: 'red',
              }}
            >
              <FontAwesomeIcon
                title="Xóa bài đăng"
                onClick={() => {
                  handleDeleteBlog(item.row.id);
                }}
                icon={faTrash as IconProp}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const fetchBlogs = () => {
    getAllBlogsNoFilter()
      .then((data) => {
        setIsLoading(false);
        setBlogs(data.result);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteBlog = async (blogId: number) => {
    confirm({
      title: <div className="default-title">XÓA BÀI ĐĂNG</div>,
      description: (
        <span style={{ fontSize: '16px' }}>
          Việc xác nhận xóa bài đăng sẽ đồng thời xóa tất cả dữ liệu liên quan,
          bao gồm đánh giá, giỏ hàng, và các thông tin khác liên quan đến sản
          phẩm này.
        </span>
      ),

      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(async () => {
        if (!isLoggedIn) {
          toast.error('Bạn phải đăng nhập để xóa bài đăng này');
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
          backendEndpoint + `/blogs/delete-blog/${blogId}`,
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
          toast.success(data.message || 'Xóa bài đăng thành công');
          setKeyCountReload(Math.random());
        } else {
          toast.error(data.message || 'Đã xảy ra lỗi khi xóa bài đăng này');
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchBlogs();
  }, [keyCountReload]);

  if (isLoading) {
    return <Loader isAdmin />;
  }

  return (
    <div className="container mt-5">
      <DataTable title="Danh sách bài đăng" columns={columns} rows={blogs} />
    </div>
  );
};

const BlogManagementPage = AdminRequirement(BlogManagement);
export default BlogManagementPage;
