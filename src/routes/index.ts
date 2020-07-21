import { Router } from 'express';
import ordersRouter from './orders.routes';

const routes = Router();

routes.use('/orders', ordersRouter);

export default routes;
