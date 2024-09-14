import DistrictModel from './DistrictModel';

class ProvinceModel {
  id: number;
  name?: string;
  districts?: DistrictModel[];

  constructor(id: number, name: string, districts: DistrictModel[]) {
    this.id = id;
    this.name = name;
    this.districts = districts;
  }
}

export default ProvinceModel;
