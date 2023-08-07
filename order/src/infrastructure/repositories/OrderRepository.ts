import { EntityManager } from 'typeorm';
import { IOrder } from '@application/dto/IOrder';
import { IOrderRepository, ICreateOrderRequest } from '@application/repositories/IOrderRepository';
import { dataSource } from './config';
import { OrderEntity } from '@infrastructure/repositories/entities/OrderEntity';

export class OrderRepository implements IOrderRepository {
  constructor(private readonly manager: EntityManager = dataSource.manager) {}

  public async create(attrs: ICreateOrderRequest): Promise<IOrder> {
    return await this.manager.save(OrderEntity, attrs);
  }

  public async update(id: number, attrs: Partial<IOrder>): Promise<IOrder> {
    await this.manager.update(OrderEntity, id, attrs);
    return await this.manager.findOneOrFail(OrderEntity, { where: { id } });
  }
}
