import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// usersRouter.get('/', async (request, response) => {
// list quantity
// });

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  },
);

// usersRouter.put('/', (request, response) => {
// Editar produto
// });

// usersRouter.delete('/', (request, response) => {
// Remover um produto
// });

export default usersRouter;
