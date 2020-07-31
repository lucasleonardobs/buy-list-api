import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: number;
}

@injectable()
class ShowOneProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findOne({ id });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}

export default ShowOneProductService;
