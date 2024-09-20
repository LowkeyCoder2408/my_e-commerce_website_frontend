import { toast } from 'react-toastify';
import { backendEndpoint } from '../utils/Service/Constant';

const token = localStorage.getItem('token');

export const handleSaveOrder = (request: any) => {
  fetch(backendEndpoint + '/orders/add-order', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(request),
  })
    .then(async (response) => {
      // Kiểm tra nếu response không có status OK
      if (!response.ok) {
        throw new Error('Thêm đơn hàng mới không thành công');
      }

      // Cố gắng parse JSON từ response
      let data;
      try {
        data = await response.json(); // Lấy JSON từ response
      } catch (error) {
        // Nếu xảy ra lỗi khi parse JSON (response trống chẳng hạn)
        throw new Error('Response không hợp lệ');
      }

      // Kiểm tra giá trị `status` trong response từ backend
      if (data?.status === 'success') {
        toast.success(data.message || 'Thêm đơn hàng mới thành công');
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
