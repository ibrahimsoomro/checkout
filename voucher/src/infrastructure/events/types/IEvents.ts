export type OrderStatus = 'PENDING' | 'SENT';
export interface IOrderSent {
  id: number;
  status: OrderStatus;
  total: number;
  createdAt: Date;
}

export interface IEvents {
  'order-svc-order-sent': IOrderSent;
}
