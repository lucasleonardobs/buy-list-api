import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../../repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';
import UpdateProductService from '../UpdateProductService';

describe('UpdateProduct', () => {
  it('Should be able to update a Product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);
    const updateProduct = new UpdateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Fruit',
      unitPrice: 123,
      category: 'Fruit',
      description: 'Fruit',
    });

    await updateProduct.execute({
      id: product.id,
      name: 'FruitFruit',
      unitPrice: 123123,
      category: 'FruitFruit',
      description: 'FruitFruit',
    });

    expect(product.name).toBe('FruitFruit');
    expect(product.unitPrice).toBe(123123);
    expect(product.category).toBe('FruitFruit');
    expect(product.description).toBe('FruitFruit');
  });

  it('should be able to check products exists.', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const updateProduct = new UpdateProductService(fakeProductsRepository);

    expect(
      updateProduct.execute({
        id: 11111,
        name: 'TestProductExist',
        unitPrice: 123123,
        category: 'TestProductExist',
        description: 'TestProductExist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
