import { Router } from 'express';

import UsersController from '../controllers/UsersController';

import validateCreateUser from '../validators/CreateUser';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', validateCreateUser, usersController.create);

// usersRouter.put('/', (request, response) => {
//  edit user
// });

// usersRouter.delete('/', (request, response) => {
//  delete user
// });

export default usersRouter;
