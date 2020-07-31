import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';

import CreateOrderService from './CreateOrderService';
import UpdateOrderService from './UpdateOrderService';

describe('UpdateOrder', () => {
  it('Should be able to update a Order', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const createOrder = new CreateOrderService(fakeOrdersRepository);
    const updateOrder = new UpdateOrderService(fakeOrdersRepository);

    const order = await createOrder.execute({
      product_id: 123,
      quantity: 123,
      total_cost: 123,
      user_id: uuid(),
    });

    await updateOrder.execute({
      id: order.id,
      product_id: 123,
      quantity: 123123123,
      total_cost: 123123123,
    });

    expect(order.product_id).toBe(123);
    expect(order.quantity).toBe(123123123);
    expect(order.total_cost).toBe(123123123);
  });

  it('should be able to check orders exists.', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const updateOrder = new UpdateOrderService(fakeOrdersRepository);

    expect(
      updateOrder.execute({
        id: uuid(),
        product_id: 123,
        quantity: 123123123,
        total_cost: 123123123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
