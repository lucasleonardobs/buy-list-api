import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface Request {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const checkOrdersExist = await this.ordersRepository.findOne({ id });

    if (!checkOrdersExist) {
      throw new AppError('Order not found.', 404);
    }

    await this.ordersRepository.delete({ id });
  }
}

export default DeleteProductService;
