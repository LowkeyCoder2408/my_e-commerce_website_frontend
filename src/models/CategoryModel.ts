class CategoryModel {
  id: number;
  name: string;
  alias: string;
  image: string;
  enabled?: boolean;
  brandIds?: number[];

  constructor(
    id: number,
    name: string,
    alias: string,
    image: string,
    enabled?: boolean,
    brandIds?: number[],
  ) {
    this.id = id;
    this.name = name;
    this.alias = alias;
    this.image = image;
    this.enabled = enabled;
    this.brandIds = brandIds;
  }
}

export default CategoryModel;
