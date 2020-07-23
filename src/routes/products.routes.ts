import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const products = await productsRepository.find();

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

    const createProduct = new CreateProductService();

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
// Editar produto
// });

// productsRouter.delete('/', ensureAuthenticated, (request, response) => {
// Remover um produto
// });

export default productsRouter;
