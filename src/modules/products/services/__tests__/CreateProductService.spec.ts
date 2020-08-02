import FakeProductsRepository from '../../repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';

describe('CreateProduct', () => {
  it('should be able to create a new Product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'teste',
      description: 'teste',
      unitPrice: 123,
      category: 'teste',
    });

    expect(product).toHaveProperty('id');
    expect(product.name).toBe('teste');
    expect(product.description).toBe('teste');
    expect(product.unitPrice).toBe(123);
    expect(product.category).toBe('teste');
  });
});
