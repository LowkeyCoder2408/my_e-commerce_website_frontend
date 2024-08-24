class FavoriteProductModel {
  id: number;
  productId: number;
  userId: number;

  constructor(id: number, productId: number, userId: number) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
  }
}

export default FavoriteProductModel;
