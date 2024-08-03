import { BookingModel } from "./BookingModel";
import { RoomImageModel } from "./RoomImageModel";
import { RoomTypeModel } from "./RoomTypeModel";

export class RoomModel {
  id?: number;
  roomTypeId: number;
  roomType?: RoomTypeModel;
  roomPrice: number;
  description?: number;
  isBooked?: boolean;
  mainRoomImage?: File | string | null;
  relatedRoomImageFiles?: File[];
  relatedRoomImages?: RoomImageModel[];
  enabled?: boolean;
  createdTime?: Date;
  updatedTime?: Date;
  ratingCount?: number;
  averageRating?: number;
  bookings?: BookingModel[];

  constructor(
    roomTypeId: number,
    roomType: RoomTypeModel,
    roomPrice: number,
    mainRoomImage: File | string | null,
    id?: number,
    description?: number,
    isBooked?: boolean,
    relatedRoomImageFiles?: File[],
    relatedRoomImages?: RoomImageModel[],
    enabled?: boolean,
    createdTime?: Date,
    updatedTime?: Date,
    ratingCount?: number,
    averageRating?: number,
    bookings?: BookingModel[]
  ) {
    this.id = id;
    this.roomTypeId = roomTypeId;
    this.roomType = roomType;
    this.roomPrice = roomPrice;
    this.description = description;
    this.isBooked = isBooked;
    this.mainRoomImage = mainRoomImage;
    this.relatedRoomImageFiles = relatedRoomImageFiles;
    this.relatedRoomImages = relatedRoomImages;
    this.enabled = enabled;
    this.createdTime = createdTime;
    this.updatedTime = updatedTime;
    this.ratingCount = ratingCount;
    this.averageRating = averageRating;
    this.bookings = bookings;
  }
}
