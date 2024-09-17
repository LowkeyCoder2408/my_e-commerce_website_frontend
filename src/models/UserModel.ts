import AddressModel from './AddressModel';
import FavoriteProductModel from './FavoriteProductModel';
import ReviewModel from './ReviewModel';

class UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photo?: string;
  // addresses?: AddressModel;
  createdTime?: Date;
  enabled?: boolean;
  roles?: string[];
  // reviews?: ReviewModel[];
  // favoriteProducts?: FavoriteProductModel[];
  authenticationType?: string;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    photo?: string,
    // addresses?: AddressModel,
    createdTime?: Date,
    enabled?: boolean,
    roles?: string[],
    // reviews?: ReviewModel[],
    // favoriteProducts?: FavoriteProductModel[],
    authenticationType?: string,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.photo = photo;
    // this.addresses = addresses;
    this.createdTime = createdTime;
    this.enabled = enabled;
    this.roles = roles;
    // this.reviews = reviews;
    // this.favoriteProducts = favoriteProducts;
    this.authenticationType = authenticationType;
  }
}

export default UserModel;
