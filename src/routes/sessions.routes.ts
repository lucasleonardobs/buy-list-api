/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    try {
      const { email, password } = request.body;

      const authenticateUser = new AuthenticateUserService();

      const { user } = await authenticateUser.execute({
        email,
        password,
      });

      delete user.password;

      return response.json({ user });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

// sessionsRouter.put('/', (request, response) => {
// Editar umpedido
// });

// sessionsRouter.delete('/', (request, response) => {
// Remover um pedido
// });

export default sessionsRouter;
