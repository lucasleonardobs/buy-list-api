/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/products/services/CreateOrderService';
import DeleteOrderService from '@modules/products/services/DeleteOrderService';
import UpdateOrderService from '@modules/products/services/UpdateOrderService';
import ListOrdersService from '@modules/products/services/ListOrdersService';

class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { quantity, total_cost, product_id, user_id } = request.body;

    const createProduct = container.resolve(CreateOrderService);

    const order = await createProduct.execute({
      quantity,
      total_cost,
      product_id,
      user_id,
    });

    return response.json(order);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { quantity, total_cost, product_id } = request.body;

    const updateOrder = container.resolve(UpdateOrderService);

    const update = await updateOrder.execute({
      id,
      quantity,
      total_cost,
      product_id,
    });

    return response.json(update);
  }

  public async delete(request: Request, _: Response): Promise<void> {
    const { id } = request.params;

    const deleteOrder = container.resolve(DeleteOrderService);

    deleteOrder.execute({ id });
  }

  public async show(_: Request, response: Response): Promise<Response> {
    const listOrderService = container.resolve(ListOrdersService);

    const orders = await listOrderService.execute();

    return response.json(orders);
  }
}

export default OrdersController;
