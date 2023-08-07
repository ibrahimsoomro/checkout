import { OrderStatus } from '@application/dto/IOrder';

export interface IOrderSent {
  id: number;
  status: OrderStatus;
  total: number;
}

export interface IEvents {
  'order-svc-order-sent': IOrderSent;
}
