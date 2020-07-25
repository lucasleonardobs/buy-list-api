/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      quantity: Joi.number().required(),
      total_cost: Joi.number().required(),
      product_id: Joi.number().required(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  ordersController.create,
);

// ordersRouter.put('/', (request, response) => {
// Editar umpedido
// });

// ordersRouter.delete('/', (request, response) => {
// Remover um pedido
// });

export default ordersRouter;
