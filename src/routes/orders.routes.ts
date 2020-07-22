/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrdersRepository from '../repositories/OrdersRepository';
import CreateOrderService from '../services/CreateOrderService';

const ordersRouter = Router();

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      quantity: Joi.number().required(),
      total_cost: Joi.number().required(),
      product: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { quantity, total_cost, product } = request.body;

    const createProduct = new CreateOrderService();

    const order = await createProduct.execute({
      quantity,
      total_cost,
      product,
    });

    return response.json(order);
  },
);

ordersRouter.put('/', (request, response) => {
  // Editar umpedido
});

ordersRouter.delete('/', (request, response) => {
  // Remover um pedido
});

export default ordersRouter;
