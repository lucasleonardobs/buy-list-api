/* eslint-disable camelcase */
import Order from '../infra/typeorm/entities/Order';

import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import IUpdateOrderDTO from '../dtos/IUpdateOrderDTO';
import IDeleteOrderDTO from '../dtos/IDeleteOrderDTO';

import ICheckOrdersExists from '../dtos/ICheckOrdersExists';
import IShowOrderDTO from '../dtos/IShowOrderDTO';

interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  update(data: IUpdateOrderDTO): Promise<Order>;
  delete(data: IDeleteOrderDTO): Promise<void>;
  findOne(id: ICheckOrdersExists): Promise<Order | undefined>;
  find(user_id: IShowOrderDTO): Promise<Order[]>;
}

export default IOrdersRepository;
