import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';

import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';

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

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  ensureAuthenticated,
  async (request, response) => {
    try {
      const { id } = request.params;

      const deleteProduct = new DeleteProductService();

      await deleteProduct.execute({ id: Number(id) });

      return response.json({ message: 'Delete has been sucessly.' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default productsRouter;
