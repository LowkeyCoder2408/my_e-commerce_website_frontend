import BrandModel from './BrandModel';
import CategoryModel from './CategoryModel';
import ProductImageModel from './ProductImageModel';

class ReviewModel {
  id: number;
  headline: string;
  rating: number;
  content: string;
  productId: number;
  userId: number;
  userPhoto: string;
  userFullName?: string;
  reviewTime?: Date;

  constructor(
    id: number,
    headline: string,
    rating: number,
    content: string,
    productId: number,
    userId: number,
    userPhoto: string,
    userFullName?: string,
    reviewTime?: Date,
  ) {
    this.id = id;
    this.headline = headline;
    this.productId = productId;
    this.userId = userId;
    this.userPhoto = userPhoto;
    this.userFullName = userFullName;
    this.content = content;
    this.rating = rating;
    this.reviewTime = reviewTime;
  }
}

export default ReviewModel;
