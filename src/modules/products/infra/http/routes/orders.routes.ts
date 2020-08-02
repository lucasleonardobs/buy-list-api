/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import OrdersController from '../controllers/OrdersController';

import validateCreateOrder from '../validators/CreateOrder';
import validateUpdateOrder from '../validators/UpdateOrder';
import validateDeleteOrder from '../validators/DeleteOrder';
import validateShowOrder from '../validators/ShowOrder';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.get(
  '/:user_id',
  ensureAuthenticated,
  validateShowOrder,
  ordersController.show,
);

ordersRouter.post(
  '/',
  validateCreateOrder,
  ensureAuthenticated,
  ordersController.create,
);

ordersRouter.put(
  '/:id',
  validateUpdateOrder,
  ensureAuthenticated,
  ordersController.update,
);

ordersRouter.delete(
  '/:id',
  validateDeleteOrder,
  ensureAuthenticated,
  ordersController.delete,
);

export default ordersRouter;
