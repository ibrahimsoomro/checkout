import { IOrder, OrderStatus } from '@application/dto/IOrder';
import { IProduct } from '@application/dto/IProduct';

export type ICreateRequest = {
  total: number;
  products: IProduct[];
};

export type IStatusUpdateRequest = {
  id: number
  status: OrderStatus;
};

export type ICreateResponse = IOrder;
export type IStatusUpdateResponse = IOrder;

export interface IOrderController {
  create(request: ICreateRequest): Promise<ICreateResponse>;
  statusUpdate(request: IStatusUpdateRequest): Promise<IStatusUpdateResponse>;
}
