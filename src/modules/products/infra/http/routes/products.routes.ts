import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.show);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  productsController.index,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      unitPrice: Joi.number().required(),
      category: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsController.create,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      unitPrice: Joi.number().required(),
      category: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsController.update,
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  ensureAuthenticated,
  productsController.delete,
);

export default productsRouter;
