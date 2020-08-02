/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';
import IProductsRepository from '../repositories/IProductsRepository';

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
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id, quantity, product_id }: Request): Promise<Order> {
    const checkOrdersExists = await this.ordersRepository.findOne({ id });
    const product = await this.productsRepository.findOne({ id: product_id });

    if (!checkOrdersExists) {
      throw new AppError('Order not found.', 404);
    }

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const updatedOrder = await this.ordersRepository.update({
      id,
      quantity,
      total_cost: product.unitPrice * quantity,
      product_id,
    });

    return updatedOrder;
  }
}

export default UpdateOrderService;
