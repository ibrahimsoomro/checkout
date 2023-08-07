import { IOrder } from '@application/dto/IOrder';
import { dataSource } from '../../config';
import { OrderEntity } from '../../entities/OrderEntity';

export const OrdersFactory = {
  create: async (attributes: IOrder
    ) => {
    const entity = dataSource.manager.create(OrderEntity, attributes);
    return await dataSource.manager.save(entity);
  },
};