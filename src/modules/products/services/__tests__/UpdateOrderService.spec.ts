import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeOrdersRepository from '../../repositories/fakes/FakeOrdersRepository';
import FakeProductsRepository from '../../repositories/fakes/FakeProductsRepository';

import CreateOrderService from '../CreateOrderService';
import UpdateOrderService from '../UpdateOrderService';
import CreateProductService from '../CreateProductService';

describe('UpdateOrder', () => {
  it('Should be able to update a Order', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);

    const createOrder = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
    );
    const updateOrder = new UpdateOrderService(fakeOrdersRepository);

    const product = await createProduct.execute({
      name: 'test',
      description: 'test',
      category: 'test',
      unitPrice: 120,
    });

    const product2 = await createProduct.execute({
      name: 'test2',
      description: 'test2',
      category: 'test2',
      unitPrice: 120,
    });

    const quantity = 3;

    const order = await createOrder.execute({
      product_id: product.id,
      quantity,
      total_cost: product.unitPrice * quantity,
      user_id: uuid(),
    });

    const quantity2 = 2;

    await updateOrder.execute({
      id: order.id,
      product_id: product2.id,
      quantity: quantity2,
      total_cost: product2.unitPrice * quantity2,
    });

    expect(order.product_id).toBe(product2.id);
    expect(order.quantity).toBe(quantity2);
    expect(order.total_cost).toBe(product2.unitPrice * quantity2);
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
