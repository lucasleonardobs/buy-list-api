import Order from '../models/Order';
import Product from '../models/Product';

import OrdersRepository from '../repositories/OrdersRepository';

interface Request {
  quantity: number;
  totalCost: number;
  product: Product;
}

class CreateOrderService {
  private ordersRepository: OrdersRepository;

  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  public execute({ quantity, totalCost, product }: Request): Order {
    const order = this.ordersRepository.create({
      quantity,
      totalCost,
      product,
    });

    return order;
  }
}

export default CreateOrderService;
