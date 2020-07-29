import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IDeleteProductDTO from '@modules/products/dtos/IDeleteProductDTO';
import ICheckProductsExists from '@modules/products/dtos/ICheckProductsExists';

import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';
import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    description,
    unitPrice,
    category,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      unitPrice,
      category,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async delete({ id }: IDeleteProductDTO): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findOne({
    id,
  }: ICheckProductsExists): Promise<Product | undefined> {
    const CheckProductsExists = await this.ormRepository.findOne({
      where: { id },
    });

    return CheckProductsExists;
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async update({
    id,
    name,
    description,
    unitPrice,
    category,
  }: IUpdateProductDTO): Promise<Product> {
    const product = await this.ormRepository.findOne({
      id,
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const updatedProduct = {
      ...product,
      name,
      description,
      unitPrice: Number(unitPrice),
      category,
    };

    await this.ormRepository.save(updatedProduct);

    return updatedProduct;
  }
}

export default ProductsRepository;
