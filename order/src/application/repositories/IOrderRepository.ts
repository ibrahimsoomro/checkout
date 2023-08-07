import { IOrder } from '@application/dto/IOrder';
import { IProduct } from '@application/dto/IProduct';

export interface ICreateOrderRequest {
  products: IProduct[];
  total: number;
}

export interface IOrderRepository {
  create(req: ICreateOrderRequest): Promise<IOrder>;
  update(id: number, req: Partial<IOrder>): Promise<IOrder>;
}
