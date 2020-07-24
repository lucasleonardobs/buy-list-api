import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';

interface Request {
  id: number;
}

class DeleteProductService {
  public async execute({ id }: Request): Promise<void> {
    const productsRepository = getRepository(Product);

    const checkProductsExists = await productsRepository.findOne({
      where: { id },
    });

    if (!checkProductsExists) {
      throw new AppError('Product not found.', 404);
    }

    await productsRepository.delete(id);
  }
}

export default DeleteProductService;
