class DeliveryMethodModel {
  id: number;
  name: string;
  description: string;
  estimatedDays: number;
  deliveryFee: number;

  constructor(
    id: number,
    name: string,
    description: string,
    estimatedDays: number,
    deliveryFee: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.estimatedDays = estimatedDays;
    this.deliveryFee = deliveryFee;
  }
}

export default DeliveryMethodModel;
