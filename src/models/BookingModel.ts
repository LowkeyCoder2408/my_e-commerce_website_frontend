export class BookingModel {
  id: number;
  checkInDate: Date;
  checkOutDate: Date;
  guestFullName: string;
  guestEmail: string;
  numberOfAdults: number;
  numberOfChildren: number;
  totalNumberOfGuests: number;
  bookingConfirmationCode: string;
  roomId: number;

  constructor(
    id: number,
    checkInDate: Date,
    checkOutDate: Date,
    guestFullName: string,
    guestEmail: string,
    numberOfAdults: number,
    numberOfChildren: number,
    totalNumberOfGuests: number,
    bookingConfirmationCode: string,
    roomId: number
  ) {
    this.id = id;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.guestFullName = guestFullName;
    this.guestEmail = guestEmail;
    this.numberOfAdults = numberOfAdults;
    this.numberOfChildren = numberOfChildren;
    this.totalNumberOfGuests = totalNumberOfGuests;
    this.bookingConfirmationCode = bookingConfirmationCode;
    this.roomId = roomId;
  }
}
