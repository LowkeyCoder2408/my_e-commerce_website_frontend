import { GridColDef } from '@mui/x-data-grid';
import AdminRequirement from '../../../utils/AdminRequirement';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEdit,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DataTable } from '../../../utils/DataTable';
import { useEffect, useState } from 'react';
import UserModel from '../../../models/UserModel';
import { FadeModal } from '../../../utils/FadeModal';
import Loader from '../../../utils/Loader';
import { backendEndpoint } from '../../../utils/Service/Constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import { Avatar, Fab } from '@mui/material';
import { FaHandshake, FaUser, FaUserShield, FaUserTag } from 'react-icons/fa';
import UserModal from './UserModal';
import { Add } from '@mui/icons-material';
import { confirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const UserManagement = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [keyCountReload, setKeyCountReload] = useState<number>(0);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const [option, setOption] = useState<string>('');
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
      field: 'photo',
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
      field: 'fullName',
      headerName: 'Tên đầy đủ',
      width: 160,
      renderCell: (params) => {
        const { firstName, lastName } = params.row;
        return <div>{`${lastName} ${firstName}`}</div>;
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
      headerName: 'Điện thoại',
      width: 100,
      renderCell: (params) => {
        return <div className="text-center">{params.value}</div>;
      },
    },
    {
      field: 'createdTime',
      headerName: 'Lần đầu tham gia',
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
      field: 'lastLoginTime',
      headerName: 'Đăng nhập lần cuối',
      width: 150,
      renderCell: (params) => {
        const dateValue = new Date(params.value);
        if (!params.value) {
          return <div className="text-center">Chưa đăng nhập</div>;
        }
        const formattedDateTime = format(dateValue, 'HH:mm:ss, dd/MM/yyyy');
        return <div className="text-center">{formattedDateTime}</div>;
      },
    },
    {
      field: 'authenticationType',
      headerName: 'Loại xác thực',
      width: 110,
      renderCell: (params) => {
        return (
          <div className="text-center" style={{ color: 'rgb(188, 177, 92)' }}>
            <i>{params.value}</i>
          </div>
        );
      },
    },
    {
      field: 'roles',
      headerName: 'Vai trò',
      width: 90,
      renderCell: (params) => {
        const roles = params.value || [];

        const iconStyle = {
          fontSize: '1.5rem',
          borderRadius: '50%',
          width: '27px',
          height: '27px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderWidth: '2px',
        };

        return (
          <div
            style={{
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            {roles.includes('Quản trị hệ thống') && (
              <div
                style={{
                  ...iconStyle,
                  color: '#d0021b',
                  borderColor: '#d0021b',
                }}
              >
                <FaUserShield title="Quản trị hệ thống" />
              </div>
            )}
            {roles.includes('Quản lý nội dung') && (
              <div
                style={{
                  ...iconStyle,
                  color: '#2382f5',
                  borderColor: '#2382f5',
                }}
              >
                <FaUserTag title="Quản lý nội dung" />
              </div>
            )}
            {roles.includes('Nhân viên bán hàng') && (
              <div
                style={{
                  ...iconStyle,
                  color: '#159010',
                  borderColor: '#159010',
                }}
              >
                <FaHandshake title="Nhân viên bán hàng" />
              </div>
            )}
            {roles.includes('Khách hàng') && (
              <div
                style={{
                  ...iconStyle,
                  color: '#f5a623',
                  borderColor: '#f5a623',
                }}
              >
                <FaUser title="Khách hàng" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: 'enabled',
      headerName: 'Hiệu lực',
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
      width: 90,
      type: 'actions',
      renderCell: (item) => {
        return (
          <div className="d-flex gap-1">
            <div
              style={{
                fontSize: '1.3rem',
                cursor: 'pointer',
                padding: '5px',
                color: '#007aff',
              }}
            >
              <FontAwesomeIcon
                title="Sửa người dùng"
                onClick={() => {
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
                  setUserId(item.row.id);
                  setOpenUserModal(true);
                  setOption('update');
                }}
                icon={faEdit as IconProp}
              />
            </div>
            <div
              style={{
                fontSize: '1.3rem',
                cursor: 'pointer',
                padding: '5px',
                color: 'red',
              }}
            >
              <FontAwesomeIcon
                title="Xóa người dùng"
                onClick={() => {
                  handleDeleteUser(item.row.id);
                }}
                icon={faTrash as IconProp}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const handleOpenUserModal = () => setOpenUserModal(true);
  const handleCloseUserModal = () => {
    setUserId(undefined);
    setOpenUserModal(false);
  };

  const fetchUsers = () => {
    fetch(backendEndpoint + `/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: UserModel[]) => {
        setIsLoading(false);
        const users: UserModel[] = data.map((user: UserModel) => ({
          ...user,
        }));

        setUsers(users);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteUser = async (userId: number) => {
    confirm({
      title: <div className="default-title">XÓA NGƯỜI DÙNG</div>,
      description: (
        <span style={{ fontSize: '16px' }}>
          Khi xác nhận xóa người dùng, tất cả các hoạt động liên quan đều sẽ bị
          xóa bao gồm các bình luận, bài đăng, ...
        </span>
      ),
      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(async () => {
        if (!isLoggedIn) {
          toast.error('Bạn phải đăng nhập để xóa người dùng này');
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
          backendEndpoint + `/users/delete-user/${userId}`,
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
          if (data.logout) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            toast.success(
              'Tài khoản đã bị xóa. Liên hệ với quản trị viên để tạo lại tài khoản',
            );
            navigate('/admin/login', { state: { from: location } });
            return;
          }

          toast.success(data.message || 'Xóa người dùng thành công');
          setKeyCountReload(Math.random());
        } else {
          toast.error(data.message || 'Đã xảy ra lỗi khi xóa người dùng này');
        }
      })
      .catch(() => {});
  };

  const handleChangeActiveState = async (
    userId: number,
    isActive: boolean,
  ) => {};

  useEffect(() => {
    fetchUsers();
  }, [keyCountReload]);

  if (isLoading) {
    return <Loader isAdmin />;
  }

  return (
    <div className="container mt-5">
      <DataTable title="Danh sách người dùng" columns={columns} rows={users} />
      <FadeModal
        open={openUserModal}
        handleOpen={handleOpenUserModal}
        handleClose={handleCloseUserModal}
      >
        <UserModal
          userId={userId}
          option={option}
          setKeyCountReload={setKeyCountReload}
          handleCloseUserModal={handleCloseUserModal}
        />
      </FadeModal>
      <Fab
        title="Thêm người dùng"
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '56px',
          height: '56px',
          backgroundColor: 'rgb(66, 165, 245)',
        }}
        onClick={() => {
          handleOpenUserModal();
          setOption('add');
          setUserId(undefined);
        }}
      >
        <Add sx={{ fontSize: '3rem' }} />
      </Fab>
    </div>
  );
};

const UserManagementPage = AdminRequirement(UserManagement);
export default UserManagementPage;
