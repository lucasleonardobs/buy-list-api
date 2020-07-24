/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';
import IOrdersRepository from '@modules/products/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/products/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({
    quantity,
    total_cost,
    product_id,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      quantity,
      total_cost,
      product_id,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
