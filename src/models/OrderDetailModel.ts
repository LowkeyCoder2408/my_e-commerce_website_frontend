class OrderDetailModel {
  id: number;
  quantity: number;
  productPriceAtOrderTime: number;
  subtotal: number;
  productId: number;
  orderId: number;

  constructor(
    id: number,
    quantity: number,
    productPriceAtOrderTime: number,
    subtotal: number,
    productId: number,
    orderId: number,
  ) {
    this.id = id;
    this.quantity = quantity;
    this.productPriceAtOrderTime = productPriceAtOrderTime;
    this.subtotal = subtotal;
    this.productId = productId;
    this.orderId = orderId;
  }
}

export default OrderDetailModel;
