import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const listProductService = container.resolve(ListProductService);

  const products = await listProductService.execute();

  return response.json(products);
});

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
  async (request, response) => {
    const { name, description, unitPrice, category } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const order = await createProduct.execute({
      name,
      description,
      unitPrice,
      category,
    });

    return response.json(order);
  },
);

// productsRouter.put('/', ensureAuthenticated, (request, response) => {
//   const { name, id, description, unitPrice, category } = request.body;
// });

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id: Number(id) });

    return response.json({ message: 'Delete has been successful.' });
  },
);

export default productsRouter;
