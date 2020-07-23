import { Router } from 'express';
import ordersRouter from './orders.routes';
import productsRouter from './products.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/orders', ordersRouter);

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

export default routes;
