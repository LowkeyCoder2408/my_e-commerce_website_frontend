class AddressModel {
  id: number;
  addressLine?: string;
  province?: string;
  district?: string;
  ward?: string;
  userId?: number;
  isDefaultAddress?: boolean;

  constructor(
    id: number,
    addressLine: string,
    province: string,
    district: string,
    ward: string,
    userId: number,
    isDefaultAddress: boolean,
  ) {
    this.id = id;
    this.addressLine = addressLine;
    this.province = province;
    this.district = district;
    this.ward = ward;
    this.userId = userId;
    this.isDefaultAddress = isDefaultAddress;
  }
}

export default AddressModel;
