import { toast } from 'react-toastify';
import { backendEndpoint } from '../utils/Service/Constant';
import { Dispatch, SetStateAction } from 'react';
import OrderModel from '../models/OrderModel';
import UserModel from '../models/UserModel';

export async function getAllOrders(): Promise<OrderModel[]> {
  try {
    const endpoint: string = backendEndpoint + '/orders';
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const orders = await response.json();

    const allOrders: OrderModel[] = orders
      .map((order: OrderModel) => {
        return order;
      })
      .sort((order1: OrderModel, order2: OrderModel) => order2.id - order1.id);
    return allOrders;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    throw error;
  }
}

export const handleSaveOrder = (
  request: any,
  fetchCartItems: () => void,
  setIsSuccessPayment?: Dispatch<SetStateAction<boolean>>,
) => {
  fetch(backendEndpoint + '/orders/add-order', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export async function calculateTotalAmountByUsers(
  users: UserModel[],
  top: number,
): Promise<{ userId: number; totalAmount: number }[]> {
  try {
    const promises = users.map(async (user: UserModel) => {
      const endpoint =
        backendEndpoint +
        `/orders/calculate-total-amount-by-user-id?userId=${user.id}`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      const totalAmount = Number(data);

      return {
        userId: user.id,
        totalAmount: totalAmount,
      };
    });

    const results = await Promise.all(promises);
    results.sort((a, b) => b.totalAmount - a.totalAmount);
    const topResults = results.slice(0, top);

    return topResults;
  } catch (error) {
    console.error(
      'Lỗi trong quá trình tính tổng số tiền cho mỗi khách hàng:',
      error,
    );
    throw error;
  }
}

export async function calculateTotalAmountByMonths(): Promise<
  { month: number; totalAmount: number }[]
> {
  try {
    const currentYear = new Date().getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const promises = months.map(async (month: number) => {
      const endpoint =
        backendEndpoint +
        `/orders/calculate-total-amount-by-month?month=${month}&year=${currentYear}`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const totalAmount = await response.json();

      return {
        month: month,
        totalAmount: totalAmount,
      };
    });

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error(
      'Lỗi trong quá trình tính tổng số tiền theo từng tháng:',
      error,
    );
    throw error;
  }
}
