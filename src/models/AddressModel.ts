import DistrictModel from './DistrictModel';
import ProvinceModel from './ProvinceModel';
import UserModel from './UserModel';
import WardModel from './WardModel';

class AddressModel {
  id: number;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  addressLine?: string;
  province?: ProvinceModel;
  district?: DistrictModel;
  ward?: WardModel;
  user?: UserModel;
  // isDefaultAddress?: boolean;

  constructor(
    id: number,
    fullName: string,
    phoneNumber: string,
    email: string,
    addressLine: string,
    province: ProvinceModel,
    district: DistrictModel,
    ward: WardModel,
    user: UserModel,
    // isDefaultAddress: boolean,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.addressLine = addressLine;
    this.province = province;
    this.district = district;
    this.ward = ward;
    this.user = user;
    // this.isDefaultAddress = isDefaultAddress;
  }
}

export default AddressModel;
