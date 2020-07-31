import { inject, injectable } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  page: number;
}

interface IResponse {
  products: Product[];
  count: number;
}

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ page }: IRequest): Promise<IResponse> {
    const {
      products,
      count,
    } = await this.productsRepository.findAllWithPagination({
      page: Number(page),
    });

    return { products, count };
  }
}

export default ListProductService;
