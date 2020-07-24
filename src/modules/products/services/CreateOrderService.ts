/* eslint-disable camelcase */
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  quantity: number;
  total_cost: number;
  product_id: number;
}

class CreateOrderService {
  constructor(private ordersRepository: IOrdersRepository) {}

  public async execute({
    quantity,
    total_cost,
    product_id,
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.create({
      quantity,
      total_cost,
      product_id,
    });

    return order;
  }
}

export default CreateOrderService;
