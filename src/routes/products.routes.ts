import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

// productsRouter.get('/', async (request, response) => {
// list quantity
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

// productsRouter.put('/', (request, response) => {
// Editar produto
// });

// productsRouter.delete('/', (request, response) => {
// Remover um produto
// });

export default productsRouter;
