import { GridColDef } from '@mui/x-data-grid';
import AdminRequirement from '../../../utils/AdminRequirement';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEdit,
  faStar,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DataTable } from '../../../utils/DataTable';
import { useEffect, useState } from 'react';
import ProductModel from '../../../models/ProductModel';
import { FadeModal } from '../../../utils/FadeModal';
import Loader from '../../../utils/Loader';
import { backendEndpoint } from '../../../utils/Service/Constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import { Avatar, Fab } from '@mui/material';
import ProductModal from './ProductModal';
import { Add } from '@mui/icons-material';
import { confirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { getAllProductsNoFilter } from '../../../api/ProductAPI';
import FormatPrice from '../../../utils/Service/FormatPrice';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const ProductManagement = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [keyCountReload, setKeyCountReload] = useState<number>(0);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const [openProductModal, setOpenProductModal] = useState<boolean>(false);
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
      field: 'mainImage',
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
      field: 'name',
      headerName: 'Tên sản phẩm',
      width: 250,
    },
    {
      field: 'category',
      headerName: 'Danh mục sản phẩm',
      width: 150,
      renderCell: (params) => {
        return <div className="text-center">{params.row.category.name}</div>;
      },
    },
    {
      field: 'brand',
      headerName: 'Thương hiệu',
      width: 100,
      renderCell: (params) => {
        return <div className="text-center">{params.row.brand.name}</div>;
      },
    },
    {
      field: 'createdTime',
      headerName: 'Ngày nhập hàng',
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
      field: 'updatedTime',
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
      field: 'listedPrice',
      headerName: 'Giá niêm yết',
      width: 120,
      renderCell: (params) => {
        return (
          <div className="text-center">
            <FormatPrice price={params.value} />
          </div>
        );
      },
    },
    {
      field: 'discountPercent',
      headerName: 'Giảm',
      width: 55,
      renderCell: (params) => {
        return <div className="text-center">{params.value}%</div>;
      },
    },
    {
      field: 'currentPrice',
      headerName: 'Giá hiện tại',
      width: 120,
      renderCell: (params) => {
        return (
          <div className="text-center">
            <FormatPrice price={params.value} />
          </div>
        );
      },
    },
    {
      field: 'soldQuantity',
      headerName: 'Đã bán',
      width: 65,
      renderCell: (params) => {
        return <div className="text-center">{params.value}</div>;
      },
    },
    {
      field: 'quantity',
      headerName: 'Tồn kho',
      width: 70,
      renderCell: (params) => {
        return <div className="text-center">{params.value}</div>;
      },
    },
    {
      field: 'shortDescription',
      headerName: 'Mô tả ngắn gọn',
      width: 200,
    },
    {
      field: 'fullDescription',
      headerName: 'Mô tả đầy đủ',
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
      field: 'operatingSystem',
      headerName: 'Hệ điều hành',
      width: 110,
      renderCell: (params) => {
        return <div className="text-center">{params.value || 'Không có'}</div>;
      },
    },
    {
      field: 'weight',
      headerName: 'Trọng lượng',
      width: 100,
      renderCell: (params) => {
        return <div className="text-center">{params.value} (g)</div>;
      },
    },
    {
      field: 'dimensions',
      headerName: 'Kích thước',
      width: 170,
      renderCell: (params) => {
        const { length, width, height } = params.row;

        let dimensions = '';
        if (length && width && height) {
          dimensions = `${length} x ${width} x ${height}`;
        } else if (length && width) {
          dimensions = `${length} x ${width} (dài x rộng)`;
        } else if (length && height) {
          dimensions = `${length} x ${height} (dài x cao)`;
        } else if (width && height) {
          dimensions = `${width} x ${height} (rộng x cao)`;
        } else if (length) {
          dimensions = `${length} (dài)`;
        } else if (width) {
          dimensions = `${width} (rộng)`;
        } else if (height) {
          dimensions = `${height} (cao)`;
        } else {
          dimensions = 'Không có thông tin';
        }

        return <div className="text-center">{dimensions}</div>;
      },
    },
    {
      field: 'averageRating',
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
      field: 'ratingCount',
      headerName: 'Số lượt',
      width: 70,
      renderCell: (params) => {
        return <div className="text-center">{params.value}</div>;
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
                title="Sửa sản phẩm"
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
                  setProductId(item.row.id);
                  setOpenProductModal(true);
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
                title="Xóa sản phẩm"
                onClick={() => {
                  handleDeleteProduct(item.row.id);
                }}
                icon={faTrash as IconProp}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const handleOpenProductModal = () => setOpenProductModal(true);
  const handleCloseProductModal = () => {
    setProductId(undefined);
    setOpenProductModal(false);
  };

  const fetchProducts = () => {
    getAllProductsNoFilter()
      .then((data) => {
        setIsLoading(false);
        setProducts(data.result);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteProduct = async (productId: number) => {
    confirm({
      title: <div className="default-title">XÓA SẢN PHẨM</div>,
      description: (
        <span style={{ fontSize: '16px' }}>
          Việc xác nhận xóa sản phẩm sẽ đồng thời xóa tất cả dữ liệu liên quan,
          bao gồm đánh giá, giỏ hàng, và các thông tin khác liên quan đến sản
          phẩm này.
        </span>
      ),

      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(async () => {
        if (!isLoggedIn) {
          toast.error('Bạn phải đăng nhập để xóa sản phẩm này');
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
          backendEndpoint + `/products/delete-product/${productId}`,
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
          toast.success(data.message || 'Xóa sản phẩm thành công');
          setKeyCountReload(Math.random());
        } else {
          toast.error(data.message || 'Đã xảy ra lỗi khi xóa sản phẩm này');
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchProducts();
  }, [keyCountReload]);

  if (isLoading) {
    return <Loader isAdmin />;
  }

  return (
    <div className="container mt-5">
      <DataTable title="Danh sách sản phẩm" columns={columns} rows={products} />
      <FadeModal
        open={openProductModal}
        handleOpen={handleOpenProductModal}
        handleClose={handleCloseProductModal}
      >
        <ProductModal
          productId={productId}
          option={option}
          setKeyCountReload={setKeyCountReload}
          handleCloseProductModal={handleCloseProductModal}
        />
      </FadeModal>
      <Fab
        title="Thêm sản phẩm"
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
          handleOpenProductModal();
          setOption('add');
          setProductId(undefined);
        }}
      >
        <Add sx={{ fontSize: '3rem' }} />
      </Fab>
    </div>
  );
};

const ProductManagementPage = AdminRequirement(ProductManagement);
export default ProductManagementPage;
