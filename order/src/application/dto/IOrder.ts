import { IProduct } from './IProduct';

export type OrderStatus = 'PENDING' | 'SENT';

export interface IOrder {
  id: number;
  total: number;
  products: IProduct[];
  createdAt: Date;
  status: OrderStatus;
}
