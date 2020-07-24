import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '../repositories/IProductsRepository';

interface Request {
  id: number;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const checkProductsExists = await this.productsRepository.findOne({ id });

    if (!checkProductsExists) {
      throw new AppError('Product not found.', 404);
    }

    await this.productsRepository.delete({ id });
  }
}

export default DeleteProductService;
