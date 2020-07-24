/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/products/services/CreateOrderService';

class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { quantity, total_cost, product_id } = request.body;

    const createProduct = container.resolve(CreateOrderService);

    const order = await createProduct.execute({
      quantity,
      total_cost,
      product_id,
    });

    return response.json(order);
  }
}

export default OrdersController;
