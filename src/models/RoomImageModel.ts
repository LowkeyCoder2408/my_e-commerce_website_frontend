export class RoomImageModel {
  id?: number;
  roomImageUrl?: string;
  roomId: number;

  constructor(id: number, roomImageUrl: string, roomId: number) {
    this.id = id;
    this.roomImageUrl = roomImageUrl;
    this.roomId = roomId;
  }
}
