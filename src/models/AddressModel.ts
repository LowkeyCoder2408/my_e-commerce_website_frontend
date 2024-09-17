class AddressModel {
  id: number;
  addressLine?: string;
  province?: string;
  district?: string;
  ward?: string;
  userId?: number;
  defaultAddress?: boolean;

  constructor(
    id: number,
    addressLine: string,
    province: string,
    district: string,
    ward: string,
    userId: number,
    defaultAddress: boolean,
  ) {
    this.id = id;
    this.addressLine = addressLine;
    this.province = province;
    this.district = district;
    this.ward = ward;
    this.userId = userId;
    this.defaultAddress = defaultAddress;
  }
}

export default AddressModel;
