import { toast } from 'react-toastify';
import { backendEndpoint } from '../utils/Service/Constant';

const token = localStorage.getItem('token');

export const handleSaveOrder = (request: any, fetchCartItems: () => void) => {
  fetch(backendEndpoint + '/orders/add-order', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(request),
  })
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        if (data.status === 'success') {
          toast.success(data.message || 'Thêm đơn hàng mới thành công');
          fetchCartItems();
        } else {
          toast.error(data.message || 'Thêm đơn hàng mới không thành công');
        }
      } else {
        toast.error(data.message || 'Thêm đơn hàng mới không thành công');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error(
        error.message || 'Đã xảy ra lỗi trong quá trình thêm đơn hàng',
      );
    });
};
