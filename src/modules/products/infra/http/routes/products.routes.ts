import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductsController from '../controllers/ProductsController';

import validateShowProduct from '../validators/ShowProduct';
import validateCreateProduct from '../validators/CreateProduct';
import validateUpdateProduct from '../validators/UpdateProduct';
import validateDeleteProduct from '../validators/DeleteProduct';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.show);

productsRouter.get('/:id', validateShowProduct, productsController.index);

productsRouter.post(
  '/',
  validateCreateProduct,
  ensureAuthenticated,
  productsController.create,
);

productsRouter.put(
  '/:id',
  validateUpdateProduct,
  ensureAuthenticated,
  productsController.update,
);

productsRouter.delete(
  '/:id',
  validateDeleteProduct,
  ensureAuthenticated,
  productsController.delete,
);

export default productsRouter;
