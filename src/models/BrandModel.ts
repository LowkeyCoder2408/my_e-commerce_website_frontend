class BrandModel {
  id: number;
  name: string;
  logo: string;
  categoryIds?: number[];

  constructor(id: number, name: string, logo: string, categoryIds?: number[]) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.categoryIds = categoryIds;
  }
}

export default BrandModel;
