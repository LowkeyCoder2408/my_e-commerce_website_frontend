import { useState, useEffect } from 'react';

// Enum và các mô tả đã có sẵn
export enum OrderStatusModel {
  NEW = 'NEW',
  PROCESSING = 'PROCESSING',
  PACKAGED = 'PACKAGED',
  PICKED = 'PICKED',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  PAID = 'PAID',
  // CANCELED = 'CANCELED',
}

interface OrderStatusModelDescriptionMap {
  [key: string]: string;
}

export const orderStatusDescriptions: OrderStatusModelDescriptionMap = {
  NEW: 'VỪA ĐƯỢC KHỞI TẠO',
  PROCESSING: 'ĐANG ĐƯỢC XỬ LÝ',
  PACKAGED: 'ĐÃ ĐÓNG GÓI VÀ CHUẨN BỊ GIAO',
  PICKED: 'SHIPPER ĐÃ NHẬN HÀNG',
  SHIPPING: 'ĐANG ĐƯỢC GIAO',
  DELIVERED: 'ĐÃ ĐƯỢC GIAO',
  PAID: 'ĐÃ THANH TOÁN',
  // CANCELED: 'ĐÃ BỊ HỦY',
};

export const getOrderStatusModelDescription = (
  status: OrderStatusModel,
): string => {
  return orderStatusDescriptions[status];
};

export default OrderStatusModel;

// Hook để lấy danh sách OrderStatusModel và mô tả tương ứng
const useOrderStatusModelList = () => {
  const [orderStatusList, setOrderStatusModelList] = useState<
    { status: OrderStatusModel; description: string }[]
  >([]);

  useEffect(() => {
    const statuses = Object.values(OrderStatusModel).map((status) => ({
      status,
      description: getOrderStatusModelDescription(status),
    }));
    setOrderStatusModelList(statuses);
  }, []);

  return orderStatusList;
};

export { useOrderStatusModelList };
