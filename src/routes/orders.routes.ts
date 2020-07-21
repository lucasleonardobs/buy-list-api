import { Router } from 'express';
import OrdersRepository from '../repositories/OrdersRepository';

const ordersRouter = Router();

const ordersRepository = new OrdersRepository();

ordersRouter.post('/', (request, response) => {
  const { amount, totalPrice, product } = request.body;

  const order = ordersRepository.create(amount, totalPrice, product);

  return response.json(order);
});

export default ordersRouter;
