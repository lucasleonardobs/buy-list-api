import { uuid } from 'uuidv4';
import Product from './Product';

class Order {
  id: string;

  quantity: number;

  totalCost: number;

  product: Product;

  constructor({ quantity, totalCost, product }: Omit<Order, 'id'>) {
    this.id = uuid();
    this.quantity = quantity;
    this.totalCost = totalCost;
    this.product = product;
  }
}

export default Order;
