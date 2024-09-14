import WardModel from './WardModel';

class DistrictModel {
  id: number;
  name?: string;
  provinceId?: number;
  wards?: WardModel[];

  constructor(
    id: number,
    name: string,
    provinceId: number,
    wards: WardModel[],
  ) {
    this.id = id;
    this.name = name;
    this.provinceId = provinceId;
    this.wards = wards;
  }
}

export default DistrictModel;
