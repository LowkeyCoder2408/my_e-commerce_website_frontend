class ProductImageModel {
  id: number;
  name?: string;
  url: string;
  publicId?: string;
  productId: number;

  constructor(
    id: number,
    url: string,
    productId: number,
    name?: string,
    publicId?: string,
  ) {
    this.id = id;
    this.url = url;
    this.productId = productId;
    this.name = name;
    this.publicId = publicId;
  }
}

export default ProductImageModel;
