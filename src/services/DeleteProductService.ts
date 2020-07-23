import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  id: number;
}

class DeleteProductService {
  public async execute({ id }: Request): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const checkProductsExists = await productsRepository.findOne({
      where: { id },
    });

    if (!checkProductsExists) {
      throw new Error('Product not found.');
    }

    await productsRepository.delete(id);
  }
}

export default DeleteProductService;
