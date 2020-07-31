import { uuid } from 'uuidv4';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';

import CreateOrderService from './CreateOrderService';
import ListOrdersService from './ListOrdersService';

import Order from '../infra/typeorm/entities/Order';

describe('ListOrder', () => {
  it('should be able to list orders.', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const createOrder = new CreateOrderService(fakeOrdersRepository);
    const listOrder = new ListOrdersService(fakeOrdersRepository);

    const orders: Order[] = [];

    const order = await createOrder.execute({
      quantity: 123,
      total_cost: 123,
      product_id: 123,
      user_id: uuid(),
    });

    orders.push(order);

    const ordersList = await listOrder.execute();

    expect(ordersList).toStrictEqual(orders);
  });
});
