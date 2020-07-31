import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

import CreateProductService from './CreateProductService';
import ShowOneProductService from './ShowOneProductService';

describe('ShowOneProduct', () => {
  it('should be able to show one Product.', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);
    const showOneProduct = new ShowOneProductService(fakeProductsRepository);

    const productTest = await createProduct.execute({
      name: 'Fruit',
      unitPrice: 123,
      category: 'Fruit',
      description: 'Fruit',
    });

    await createProduct.execute({
      name: 'Fruit2',
      unitPrice: 1232,
      category: 'Fruit2',
      description: 'Fruit2',
    });

    await createProduct.execute({
      name: 'Fruit3',
      unitPrice: 1232,
      category: 'Fruit3',
      description: 'Fruit3',
    });

    const productShow = await showOneProduct.execute({ id: productTest.id });

    expect(productShow.name).toBe('Fruit');
    expect(productShow.unitPrice).toBe(123);
    expect(productShow.category).toBe('Fruit');
    expect(productShow.description).toBe('Fruit');
  });

  it('should be able to check products exists.', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const showOneProduct = new ShowOneProductService(fakeProductsRepository);

    expect(showOneProduct.execute({ id: 13213121 })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
