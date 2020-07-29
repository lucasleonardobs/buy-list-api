/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface Request {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  category: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    unitPrice,
    category,
  }: Request): Promise<Product> {
    const checkProductsExists = await this.productsRepository.findOne({ id });

    if (!checkProductsExists) {
      throw new AppError('Product not found.', 404);
    }

    const updatedProducts = await this.productsRepository.update({
      id,
      name,
      description,
      unitPrice,
      category,
    });

    return updatedProducts;
  }
}

export default UpdateProductService;
