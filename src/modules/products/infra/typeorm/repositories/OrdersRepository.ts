/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/products/repositories/IOrdersRepository';

import ICreateOrderDTO from '@modules/products/dtos/ICreateOrderDTO';
import IUpdateOrderDTO from '@modules/products/dtos/IUpdateOrderDTO';
import IDeleteOrderDTO from '@modules/products/dtos/IDeleteOrderDTO';

import ICheckOrdersExists from '@modules/products/dtos/ICheckOrdersExists';

import AppError from '@shared/errors/AppError';
import IShowOrderDTO from '@modules/products/dtos/IShowOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async find({ user_id }: IShowOrderDTO): Promise<Order[]> {
    const orders = await this.ormRepository.find({ user_id });

    return orders;
  }

  public async create({
    quantity,
    total_cost,
    product_id,
    user_id,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      quantity,
      total_cost,
      product_id,
      user_id,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async update({
    id,
    quantity,
    total_cost,
    product_id,
  }: IUpdateOrderDTO): Promise<Order> {
    const order = await this.ormRepository.findOne({
      id,
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    const updatedOrder = {
      ...order,
      quantity,
      total_cost,
      product_id,
    };

    await this.ormRepository.save(updatedOrder);

    return updatedOrder;
  }

  public async delete({ id }: IDeleteOrderDTO): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findOne({ id }: ICheckOrdersExists): Promise<Order | undefined> {
    const CheckOrderExists = await this.ormRepository.findOne({
      where: { id },
    });

    return CheckOrderExists;
  }
}

export default OrdersRepository;
