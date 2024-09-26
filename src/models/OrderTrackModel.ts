class OrderTrackModel {
  id: number;
  orderId: number;
  note?: string;
  updatedTime?: Date;
  status?: string;

  constructor(
    id: number,
    orderId: number,
    note?: string,
    updatedTime?: Date,
    status?: string,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.note = note;
    this.updatedTime = updatedTime;
    this.status = status;
  }
}

export default OrderTrackModel;
