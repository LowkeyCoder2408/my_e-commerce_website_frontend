import ProductModel from './ProductModel';

class OrderDetailModel {
  id: number;
  quantity: number;
  productPriceAtOrderTime: number;
  subtotal: number;
  product: ProductModel;
  orderId: number;

  constructor(
    id: number,
    quantity: number,
    productPriceAtOrderTime: number,
    subtotal: number,
    product: ProductModel,
    orderId: number,
  ) {
    this.id = id;
    this.quantity = quantity;
    this.productPriceAtOrderTime = productPriceAtOrderTime;
    this.subtotal = subtotal;
    this.product = product;
    this.orderId = orderId;
  }
}

export default OrderDetailModel;
