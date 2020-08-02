import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IDeleteProductDTO from '@modules/products/dtos/IDeleteProductDTO';

import ICheckProductsExists from '@modules/products/dtos/ICheckProductsExists';

import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';
import AppError from '@shared/errors/AppError';
import Product from '../../infra/typeorm/entities/Product';

interface IFindAllWithPaginationDTO {
  page: number;
}

interface IResponseFindAllWithPagination {
  products: Product[];
  count: number;
}

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

  public async update({
    id,
    name,
    description,
    unitPrice,
    category,
  }: IUpdateProductDTO): Promise<Product> {
    const findProduct = await this.products.find(product => product.id === id);

    if (!findProduct) {
      throw new AppError('Product not found', 404);
    }

    findProduct.name = name;
    findProduct.description = description;
    findProduct.unitPrice = Number(unitPrice);
    findProduct.category = category;

    return findProduct;
  }

  public async delete({ id }: IDeleteProductDTO): Promise<void> {
    const filtered = this.products.filter(product => product.id !== id);
    this.products = filtered;
  }

  public async findOne({
    id,
  }: ICheckProductsExists): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async findAllWithPagination(
    data: IFindAllWithPaginationDTO,
  ): Promise<IResponseFindAllWithPagination> {
    const { page } = data;
    const { products } = this;

    const take = 8;

    const startPoint = page * take - take;
    const finishPoint = page * take;

    const productsPaginate = products.splice(startPoint, finishPoint);
    const count = products.length;

    return { products: productsPaginate, count };
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
