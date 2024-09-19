import OrderDetailModel from './OrderDetailModel';

class OrderModel {
  id: number;
  createdTime?: Date;
  addressLine?: string;
  province?: string;
  district?: string;
  ward?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  totalPriceProduct?: number;
  deliveryFee?: number;
  totalPrice?: number;
  status?: string;
  note?: string;
  orderDetails?: OrderDetailModel[];
  userId?: number;
  paymentMethodName?: string;
  deliveryMethodName?: string;

  constructor(
    id: number,
    createdTime?: Date,
    addressLine?: string,
    province?: string,
    district?: string,
    ward?: string,
    fullName?: string,
    phoneNumber?: string,
    email?: string,
    totalPriceProduct?: number,
    deliveryFee?: number,
    totalPrice?: number,
    status?: string,
    note?: string,
    orderDetails?: OrderDetailModel[],
    userId?: number,
    paymentMethodName?: string,
    deliveryMethodName?: string,
  ) {
    this.id = id;
    this.createdTime = createdTime;
    this.addressLine = addressLine;
    this.province = province;
    this.district = district;
    this.ward = ward;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.totalPriceProduct = totalPriceProduct;
    this.deliveryFee = deliveryFee;
    this.totalPrice = totalPrice;
    this.status = status;
    this.note = note;
    this.orderDetails = orderDetails;
    this.userId = userId;
    this.paymentMethodName = paymentMethodName;
    this.deliveryMethodName = deliveryMethodName;
  }
}

export default OrderModel;