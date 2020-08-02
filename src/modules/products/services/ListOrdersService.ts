/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';

interface IRequest {
  user_id: string;
}

@injectable()
class ListOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Order[]> {
    const orders = await this.ordersRepository.find({ user_id });

    return orders;
  }
}

export default ListOrdersService;
