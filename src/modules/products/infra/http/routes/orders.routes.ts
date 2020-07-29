/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.get('/', ensureAuthenticated, ordersController.show);

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
  ensureAuthenticated,
  ordersController.create,
);

ordersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      quantity: Joi.number(),
      total_cost: Joi.number(),
      product_id: Joi.number(),
    },
  }),
  ensureAuthenticated,
  ordersController.update,
);

ordersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  ordersController.delete,
);

export default ordersRouter;
