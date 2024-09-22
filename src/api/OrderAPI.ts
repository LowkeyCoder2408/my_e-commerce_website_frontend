import { toast } from 'react-toastify';
import { backendEndpoint } from '../utils/Service/Constant';
import { Dispatch, SetStateAction } from 'react';

const token = localStorage.getItem('token');

export const handleSaveOrder = (
  request: any,
  fetchCartItems: () => void,
  setIsSuccessPayment?: Dispatch<SetStateAction<boolean>>,
) => {
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
          setIsSuccessPayment && setIsSuccessPayment(true);
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
