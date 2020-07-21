import { Router } from 'express';
import { uuid } from 'uuidv4';

const ordersRouter = Router();

const orders = [];

ordersRouter.post('/', (request, response) => {
  const { amount, totalPrice, product } = request.body;

  const order = {
    id: uuid(),
    amount,
    totalPrice,
    product,
  };

  orders.push(order);

  return response.json(order);
});

export default ordersRouter;
