import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';

@injectable()
class ListOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(): Promise<Order[]> {
    const orders = await this.ordersRepository.find();

    return orders;
  }
}

export default ListOrdersService;
