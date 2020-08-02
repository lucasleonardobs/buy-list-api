import { uuid } from 'uuidv4';
import FakeOrdersRepository from '../../repositories/fakes/FakeOrdersRepository';
import FakeProductsRepository from '../../repositories/fakes/FakeProductsRepository';

import CreateOrderService from '../CreateOrderService';
import ListOrdersService from '../ListOrdersService';

import Order from '../../infra/typeorm/entities/Order';
import CreateProductService from '../CreateProductService';

describe('ListOrder', () => {
  it('should be able to list Orders.', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const fakeProductsRepository = new FakeProductsRepository();

    const createProduct = new CreateProductService(fakeProductsRepository);
    const createOrder = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
    );
    const listOrder = new ListOrdersService(fakeOrdersRepository);

    const product = await createProduct.execute({
      name: 'test',
      description: 'test',
      category: 'test',
      unitPrice: 120,
    });

    const orders: Order[] = [];

    const quantity = 3;

    const order = await createOrder.execute({
      quantity,
      product_id: product.id,
      user_id: uuid(),
      total_cost: product.unitPrice * quantity,
    });

    orders.push(order);

    const ordersList = await listOrder.execute({ user_id: order.user_id });

    expect(ordersList).toStrictEqual(orders);
  });
});
