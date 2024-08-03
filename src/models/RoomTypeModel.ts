export class RoomTypeModel {
  id?: number;
  name?: string;
  mainImage?: string;
  description?: string;

  constructor(
    id: number,
    name: string,
    mainImage: string,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.mainImage = mainImage;
    this.description = description;
  }
}
