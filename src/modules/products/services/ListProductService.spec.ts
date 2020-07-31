import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

import CreateProductService from './CreateProductService';
import ListProductService from './ListProductService';

import Product from '../infra/typeorm/entities/Product';

describe('ListProduct', () => {
  it('should be able to list Products.', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);
    const listProduct = new ListProductService(fakeProductsRepository);

    const products: Product[] = [];

    const product = await createProduct.execute({
      name: 'teste',
      description: 'teste',
      unitPrice: 123,
      category: 'teste',
    });

    products.push(product);

    const productsList = await listProduct.execute();

    expect(productsList).toStrictEqual(products);
  });
});
