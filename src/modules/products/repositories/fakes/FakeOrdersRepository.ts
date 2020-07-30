/* eslint-disable camelcase */
import { uuid } from 'uuidv4';

import IOrdersRepository from '@modules/products/repositories/IOrdersRepository';

import ICreateOrderDTO from '@modules/products/dtos/ICreateOrderDTO';
import IUpdateOrderDTO from '@modules/products/dtos/IUpdateOrderDTO';
import IDeleteOrderDTO from '@modules/products/dtos/IDeleteOrderDTO';

import ICheckOrdersExists from '@modules/products/dtos/ICheckOrdersExists';

import AppError from '@shared/errors/AppError';
import Order from '@modules/products/infra/typeorm/entities/Order';

class OrdersRepository implements IOrdersRepository {
  orders: Order[] = [];

  public async find(): Promise<Order[]> {
    return this.orders;
  }

  public async create({
    quantity,
    total_cost,
    product_id,
    user_id,
  }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, {
      id: uuid(),
      quantity,
      total_cost,
      product_id,
      user_id,
    });

    this.orders.push(order);

    return order;
  }

  public async update({
    id,
    quantity,
    total_cost,
    product_id,
  }: IUpdateOrderDTO): Promise<Order> {
    const findOrder = await this.orders.find(order => order.id === id);

    if (!findOrder) {
      throw new AppError('Product not found', 404);
    }

    findOrder.quantity = quantity;
    findOrder.total_cost = total_cost;
    findOrder.product_id = product_id;

    return findOrder;
  }

  public async delete({ id }: IDeleteOrderDTO): Promise<void> {
    const filtered = this.orders.filter(order => order.id !== id);
    this.orders = filtered;
  }

  public async findOne({ id }: ICheckOrdersExists): Promise<Order | undefined> {
    const findProduct = this.orders.find(product => product.id === id);

    return findProduct;
  }
}

export default OrdersRepository;
