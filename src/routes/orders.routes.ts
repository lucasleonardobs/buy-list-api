import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrdersRepository from '../repositories/OrdersRepository';
import CreateOrderService from '../services/CreateOrderService';

const ordersRouter = Router();
const ordersRepository = new OrdersRepository();

ordersRouter.get('/', (request, response) => {
  // listar quantidade de pedidos
});

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      quantity: Joi.number().required(),
      totalCost: Joi.number().required(),
      product: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        unitPrice: Joi.number().required(),
        category: Joi.string().required(),
      }),
    },
  }),
  (request, response) => {
    const { quantity, totalCost, product } = request.body;

    const createOrder = new CreateOrderService(ordersRepository);

    const order = createOrder.execute({ quantity, totalCost, product });

    return response.json(order);
  },
);

ordersRouter.delete('/', (request, response) => {
  // Remover um pedido
});

export default ordersRouter;
