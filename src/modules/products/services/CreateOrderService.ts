/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  quantity: number;
  total_cost: number;
  product_id: number;
  user_id: string;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    quantity,
    total_cost,
    product_id,
    user_id,
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.create({
      quantity,
      total_cost,
      product_id,
      user_id,
    });

    return order;
  }
}

export default CreateOrderService;
