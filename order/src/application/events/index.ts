import { OrderStatus } from "@application/dto/IOrder";
import { IEventBus as IBaseEventBus } from "@shared/application/events";

interface IOrderSent {
  id: number;
  status: OrderStatus;
  total: number;
}

export interface IApplicationEvents {
  "order-sent": IOrderSent;
}

export type IEventBus = IBaseEventBus<IApplicationEvents>;
