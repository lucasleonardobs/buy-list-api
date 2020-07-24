import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IDeleteProductDTO from '../dtos/IDeleteProductDTO';
import ICheckProductsExists from '../dtos/ICheckProductsExists';

import Product from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  delete(data: IDeleteProductDTO): Promise<void>;
  findOne(data: ICheckProductsExists): Promise<Product | undefined>;
}

export default IProductsRepository;
