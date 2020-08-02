import AppError from '@shared/errors/AppError';

import { uuid } from 'uuidv4';

import FakeOrdersRepository from '../../repositories/fakes/FakeOrdersRepository';
import CreateOrderService from '../CreateOrderService';
import DeleteOrderService from '../DeleteOrderService';
import FakeProductsRepository from '../../repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';

describe('DeleteOrder', () => {
  it('should be able to delete a Order.', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const fakeProductsRepository = new FakeProductsRepository();

    const createProduct = new CreateProductService(fakeProductsRepository);
    const deleteProduct = new DeleteOrderService(fakeOrdersRepository);
    const createOrder = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
    );

    const product = await createProduct.execute({
      name: 'test',
      category: 'test',
      description: 'test',
      unitPrice: 100,
    });

    const quantity = 2;

    const orderDeleteTest = await createOrder.execute({
      quantity,
      total_cost: product.id * quantity,
      product_id: product.id,
      user_id: uuid(),
    });

    const { id } = orderDeleteTest;
    await deleteProduct.execute({ id });
    const find = await fakeOrdersRepository.findOne({ id });

    expect(find).toBeUndefined();
  });

  it('should be able to check orders exists.', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const deleteOrder = new DeleteOrderService(fakeOrdersRepository);

    expect(deleteOrder.execute({ id: '132131' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
