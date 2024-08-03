class CategoryModel {
  id: number;
  name: string;
  image: string;
  enabled?: boolean;
  brandIds?: number[];

  constructor(
    id: number,
    name: string,
    image: string,
    enabled?: boolean,
    brandIds?: number[],
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.enabled = enabled;
    this.brandIds = brandIds;
  }
}

export default CategoryModel;
