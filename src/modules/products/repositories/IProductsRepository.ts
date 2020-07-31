import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IDeleteProductDTO from '../dtos/IDeleteProductDTO';
import ICheckProductsExists from '../dtos/ICheckProductsExists';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';
import IFindAllWithPaginationDTO from '../dtos/IFindAllWithPaginationDTO';

import Product from '../infra/typeorm/entities/Product';

interface IResponseFindAllWithPagination {
  products: Product[];
  count: number;
}

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;

  update(data: IUpdateProductDTO): Promise<Product>;

  delete(id: IDeleteProductDTO): Promise<void>;

  findAllWithPagination(
    page: IFindAllWithPaginationDTO,
  ): Promise<IResponseFindAllWithPagination>;

  findOne(id: ICheckProductsExists): Promise<Product | undefined>;

  find(): Promise<Product[]>;
}

export default IProductsRepository;
