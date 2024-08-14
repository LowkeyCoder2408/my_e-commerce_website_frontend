import BrandModel from './BrandModel';
import CategoryModel from './CategoryModel';
import ProductImageModel from './ProductImageModel';

class ProductModel {
  id: number;
  name: string;
  alias: string;
  shortDescription: string;
  fullDescription?: string;
  createdTime?: number[];
  updatedTime?: number[];
  enabled?: boolean;
  quantity?: number;
  soldQuantity?: number;
  listedPrice: number;
  currentPrice?: number;
  discountPercent?: number;
  length?: number;
  width?: number;
  height?: number;
  weight: number;
  operatingSystem?: string;
  mainImage: string;
  mainImagePublicId?: string;
  category: CategoryModel;
  brand: BrandModel;
  images: ProductImageModel[];
  ratingCount?: number;
  averageRating?: number;

  constructor(
    id: number,
    name: string,
    alias: string,
    shortDescription: string,
    listedPrice: number,
    weight: number,
    mainImage: string,
    category: CategoryModel,
    brand: BrandModel,
    images: ProductImageModel[],
    fullDescription?: string,
    createdTime?: number[],
    updatedTime?: number[],
    enabled?: boolean,
    quantity?: number,
    soldQuantity?: number,
    currentPrice?: number,
    discountPercent?: number,
    length?: number,
    width?: number,
    height?: number,
    operatingSystem?: string,
    mainImagePublicId?: string,
    ratingCount?: number,
    averageRating?: number,
  ) {
    this.id = id;
    this.name = name;
    this.alias = alias;
    this.shortDescription = shortDescription;
    this.listedPrice = listedPrice;
    this.weight = weight;
    this.mainImage = mainImage;
    this.category = category;
    this.brand = brand;
    this.images = images;
    this.fullDescription = fullDescription;
    this.createdTime = createdTime;
    this.updatedTime = updatedTime;
    this.enabled = enabled;
    this.quantity = quantity;
    this.soldQuantity = soldQuantity;
    this.currentPrice = currentPrice;
    this.discountPercent = discountPercent;
    this.length = length;
    this.width = width;
    this.height = height;
    this.operatingSystem = operatingSystem;
    this.mainImagePublicId = mainImagePublicId;
    this.ratingCount = ratingCount;
    this.averageRating = averageRating;
  }
}

export default ProductModel;
