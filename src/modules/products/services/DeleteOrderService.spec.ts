import AppError from '@shared/errors/AppError';

import { uuid } from 'uuidv4';

import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import CreateOrderService from './CreateOrderService';
import DeleteOrderService from './DeleteOrderService';

describe('DeleteOrder', () => {
  it('should be able to delete a Order.', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const createProduct = new CreateOrderService(fakeOrdersRepository);
    const deleteProduct = new DeleteOrderService(fakeOrdersRepository);

    const productDeleteTest = await createProduct.execute({
      quantity: 123,
      total_cost: 123,
      product_id: 123,
      user_id: uuid(),
    });

    const { id } = productDeleteTest;
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
