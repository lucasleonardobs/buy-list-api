import { uuid } from 'uuidv4';

import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import CreateOrderService from './CreateOrderService';

describe('CreateOrder', () => {
  it('Should be able to create a new Order', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const createOrder = new CreateOrderService(fakeOrdersRepository);

    const order = await createOrder.execute({
      product_id: 123,
      quantity: 123,
      total_cost: 123,
      user_id: uuid(),
    });

    expect(order).toHaveProperty('id');
    expect(order.product_id).toBe(123);
    expect(order.quantity).toBe(123);
    expect(order.total_cost).toBe(123);
  });
});
