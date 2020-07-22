import { Router } from 'express';
import ordersRouter from './orders.routes';
import productsRouter from './products.routes';

const routes = Router();

routes.use('/orders', ordersRouter);

routes.use('/products', productsRouter);

export default routes;
