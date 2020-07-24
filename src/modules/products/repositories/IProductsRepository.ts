import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IDeleteProductDTO from '../dtos/IDeleteProductDTO';
import ICheckProductsExists from '../dtos/ICheckProductsExists';

import Product from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  delete(id: IDeleteProductDTO): Promise<void>;
  findOne(id: ICheckProductsExists): Promise<Product | undefined>;
  find(): Promise<Product[]>;
}

export default IProductsRepository;
