import { Router } from 'express';
import Order from '../models/Order';

const ordersRouter = Router();

const orders: Order[] = [];

ordersRouter.post('/', (request, response) => {
  const { amount, totalPrice, product } = request.body;

  const order = new Order(amount, totalPrice, product);

  orders.push(order);

  return response.json(order);
});

export default ordersRouter;
