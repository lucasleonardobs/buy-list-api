import Order from '../models/Order';

class OrdersRepository {
  private order: Order[];

  constructor() {
    this.order = [];
  }

  public create(amount: number, totalPrice: number, product: string): Order {
    const order = new Order(amount, totalPrice, product);

    this.order.push(order);

    return order;
  }
}

export default OrdersRepository;
