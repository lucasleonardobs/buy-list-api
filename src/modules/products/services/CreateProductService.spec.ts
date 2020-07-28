import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';

describe('CreateProduct', () => {
  it('should be able to create a new product', async () => {
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
