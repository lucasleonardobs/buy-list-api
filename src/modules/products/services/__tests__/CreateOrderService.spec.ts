import { uuid } from 'uuidv4';

import FakeOrdersRepository from '../../repositories/fakes/FakeOrdersRepository';
import FakeProductsRepository from '../../repositories/fakes/FakeProductsRepository';

import CreateOrderService from '../CreateOrderService';
import CreateProductService from '../CreateProductService';

describe('CreateOrder', () => {
  it('Should be able to create a new Order', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);

    const createOrder = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
    );

    const product = await createProduct.execute({
      name: 'teste',
      description: 'teste',
      unitPrice: 100,
      category: 'teste',
    });

    const quantity = 3;

    const order = await createOrder.execute({
      product_id: product.id,
      quantity,
      total_cost: product.unitPrice * quantity,
      user_id: uuid(),
    });

    expect(order).toHaveProperty('id');
    expect(order.product_id).toBe(product.id);
    expect(order.quantity).toBe(3);
    expect(order.total_cost).toBe(300);
  });
});
