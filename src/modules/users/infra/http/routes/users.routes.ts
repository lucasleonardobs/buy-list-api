import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();

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
    const usersRepository = new UsersRepository();

    const { name, email, password } = request.body;

    const createUser = new CreateUserService(usersRepository);

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
// Editar user
// });

// usersRouter.delete('/', (request, response) => {
// Remover um user
// });

export default usersRouter;
