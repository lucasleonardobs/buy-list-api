import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  // eslint-disable-next-line camelcase
  total_cost: number;

  @Column()
  product: string;
}

export default Order;
