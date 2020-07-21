import { uuid } from 'uuidv4';

class Order {
  id: string;

  amount: number;

  totalPrice: number;

  product: string;

  constructor(amount: number, totalPrice: number, product: string) {
    this.id = uuid();
    this.amount = amount;
    this.totalPrice = totalPrice;
    this.product = product;
  }
}

export default Order;
