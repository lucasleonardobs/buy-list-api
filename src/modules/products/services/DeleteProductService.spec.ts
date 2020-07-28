import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

import DeleteProductService from './DeleteProductService';
import CreateProductService from './CreateProductService';

describe('DeleteProduct', () => {
  it('should be able to delete a new product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);
    const deleteProduct = new DeleteProductService(fakeProductsRepository);

    const productDeleteTest = await createProduct.execute({
      name: 'teste',
      description: 'teste',
      unitPrice: 123,
      category: 'teste',
    });

    const { id } = productDeleteTest;
    await deleteProduct.execute({ id });
    const find = await fakeProductsRepository.findOne({ id });

    expect(find).toBeUndefined();
  });
});

describe('CheckProductsExists', () => {
  it('should be able to check products exists.', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const deleteProduct = new DeleteProductService(fakeProductsRepository);

    expect(deleteProduct.execute({ id: 132131 })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
