import { EntityRepository, Repository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {}

export default OrdersRepository;
