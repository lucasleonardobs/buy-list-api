import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

class ListProductService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.find();

    return products;
  }
}

export default ListProductService;
