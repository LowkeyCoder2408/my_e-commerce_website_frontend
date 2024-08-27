import ProductModel from './ProductModel';

class CartItemModel {
  id: number;
  userId: number;
  product: ProductModel;
  quantity: number;

  constructor(
    id: number,
    product: ProductModel,
    userId: number,
    quantity: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.product = product;
    this.quantity = quantity;
  }
}

export default CartItemModel;
