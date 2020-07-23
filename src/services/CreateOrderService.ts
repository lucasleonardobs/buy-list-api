/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';

import Order from '../models/Order';

import OrdersRepository from '../repositories/OrdersRepository';

interface Request {
  quantity: number;
  total_cost: number;
  product_id: number;
}

class CreateOrderService {
  public async execute({
    quantity,
    total_cost,
    product_id,
  }: Request): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = ordersRepository.create({
      quantity,
      total_cost,
      product_id,
    });

    await ordersRepository.save(order);

    return order;
  }
}

export default CreateOrderService;
