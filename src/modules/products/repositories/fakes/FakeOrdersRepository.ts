/* eslint-disable camelcase */
import { uuid } from 'uuidv4';

import IOrdersRepository from '@modules/products/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/products/dtos/ICreateOrderDTO';

import Order from '@modules/products/infra/typeorm/entities/Order';

class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async create({
    quantity,
    total_cost,
    product_id,
  }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, { id: uuid(), quantity, total_cost, product_id });

    this.orders.push(order);

    return order;
  }
}

export default FakeOrdersRepository;
