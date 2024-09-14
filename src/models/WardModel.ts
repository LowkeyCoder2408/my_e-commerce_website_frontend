class WardModel {
  id: number;
  name?: string;
  districtId?: number;

  constructor(id: number, districtId: number, name: string) {
    this.id = id;
    this.name = name;
    this.districtId = districtId;
  }
}

export default WardModel;
