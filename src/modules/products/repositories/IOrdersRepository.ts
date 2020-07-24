import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
}

export default IOrdersRepository;
