import { getRepository } from 'typeorm';

import Product from '../infra/typeorm/entities/Product';

interface Request {
  name: string;
  description: string;
  unitPrice: number;
  category: string;
}

class CreateProductService {
  public async execute({
    name,
    description,
    unitPrice,
    category,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product = productsRepository.create({
      name,
      description,
      unitPrice,
      category,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
