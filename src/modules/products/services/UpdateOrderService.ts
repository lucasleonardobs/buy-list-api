/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface Request {
  id: string;
  quantity: number;
  total_cost: number;
  product_id: number;
}

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    id,
    quantity,
    total_cost,
    product_id,
  }: Request): Promise<Order> {
    const checkOrdersExists = await this.ordersRepository.findOne({ id });

    if (!checkOrdersExists) {
      throw new AppError('Order not found.', 404);
    }

    const updatedOrder = await this.ordersRepository.update({
      id,
      quantity,
      total_cost,
      product_id,
    });

    return updatedOrder;
  }
}

export default UpdateOrderService;
