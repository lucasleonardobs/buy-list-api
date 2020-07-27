import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import IDeleteProductDTO from '@modules/products/dtos/IDeleteProductDTO';
import ICheckProductsExists from '@modules/products/dtos/ICheckProductsExists';
import Product from '../../infra/typeorm/entities/Product';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  static latestId: number;

  public async create({
    name,
    description,
    unitPrice,
    category,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: FakeProductsRepository.incrementId,
      name,
      description,
      unitPrice,
      category,
    });

    this.products.push(product);

    return product;
  }

  public async delete({ id }: IDeleteProductDTO): Promise<void> {
    const index = this.products.findIndex(product => product.id === id);

    this.products.splice(index);
  }

  public async findOne({
    id,
  }: ICheckProductsExists): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async find(): Promise<Product[]> {
    return this.products;
  }

  static incrementId(): number {
    if (!this.latestId) this.latestId = 1;
    else this.latestId += 1;

    return this.latestId;
  }
}

export default FakeProductsRepository;
