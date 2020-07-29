import Order from '../infra/typeorm/entities/Order';

import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import IUpdateOrderDTO from '../dtos/IUpdateOrderDTO';
import IDeleteOrderDTO from '../dtos/IDeleteOrderDTO';

import ICheckOrdersExists from '../dtos/ICheckOrdersExists';

interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  update(data: IUpdateOrderDTO): Promise<Order>;
  delete(data: IDeleteOrderDTO): Promise<void>;
  findOne(id: ICheckOrdersExists): Promise<Order | undefined>;
  find(): Promise<Order[]>;
}

export default IOrdersRepository;
