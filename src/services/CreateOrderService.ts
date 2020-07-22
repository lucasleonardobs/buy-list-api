/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';

import Order from '../models/Order';

import OrdersRepository from '../repositories/OrdersRepository';

interface Request {
  quantity: number;
  total_cost: number;
  product: string;
}

class CreateOrderService {
  public async execute({
    quantity,
    total_cost,
    product,
  }: Request): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = ordersRepository.create({
      quantity,
      total_cost,
      product,
    });

    await ordersRepository.save(order);

    return order;
  }
}

export default CreateOrderService;
