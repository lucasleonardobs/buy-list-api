import Order from '../models/Order';
import Product from '../models/Product';

interface CreateOrderDTO {
  quantity: number;
  totalCost: number;
  product: Product;
}

class OrdersRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  public all(): Order[] {
    return this.orders;
  }

  public create({ quantity, totalCost, product }: CreateOrderDTO): Order {
    const order = new Order({ quantity, totalCost, product });

    this.orders.push(order);

    return order;
  }
}

export default OrdersRepository;
