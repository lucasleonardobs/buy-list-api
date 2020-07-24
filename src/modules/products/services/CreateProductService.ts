import Product from '../infra/typeorm/entities/Product';

import IProductsRepository from '../repositories/IProductsRepository';

interface Request {
  name: string;
  description: string;
  unitPrice: number;
  category: string;
}

class CreateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute({
    name,
    description,
    unitPrice,
    category,
  }: Request): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      description,
      unitPrice,
      category,
    });

    return product;
  }
}

export default CreateProductService;
