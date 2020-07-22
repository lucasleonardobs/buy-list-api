import { EntityRepository, Repository } from 'typeorm';
import Order from '../models/Order';

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {}

export default OrdersRepository;
