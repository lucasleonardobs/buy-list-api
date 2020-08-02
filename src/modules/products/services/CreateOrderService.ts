/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';
import IProductsRepository from '../repositories/IProductsRepository';

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
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    quantity,
    product_id,
    user_id,
  }: IRequest): Promise<Order> {
    const product = await this.productsRepository.findOne({ id: product_id });

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const order = await this.ordersRepository.create({
      quantity,
      total_cost: product.unitPrice * quantity,
      product_id,
      user_id,
    });

    return order;
  }
}

export default CreateOrderService;
