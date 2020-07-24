import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

const productsRouter = Router();
const productsRepository = new ProductsRepository();

// productsRouter.get('/', async (request, response) => {
//   const productsRepository = getRepository(Product);
//   const products = await productsRepository.find();

//   return response.json(products);
// });

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

    const createProduct = new CreateProductService(productsRepository);

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

    const deleteProduct = new DeleteProductService(productsRepository);

    await deleteProduct.execute({ id: Number(id) });

    return response.json({ message: 'Delete has been sucessly.' });
  },
);

export default productsRouter;
