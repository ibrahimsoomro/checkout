import { IOrder } from "@application/dto/IOrder";
import { IProduct } from "@application/dto/IProduct";
import { IEventBus } from "@application/events";
import { IOrderRepository } from "@application/repositories/IOrderRepository";
import { IUsecase } from "@shared/application/IUsecase";

export interface ICreateOrderAttrs {
  total: number;
  products: IProduct[];
}

export type ICreateOrderUsecase = IUsecase<ICreateOrderAttrs, IOrder>;

export class CreateOrderUsecase implements ICreateOrderUsecase {
  constructor(
    private readonly orderRepository: IOrderRepository,
  ) {}
  public async execute(attrs: ICreateOrderAttrs): Promise<IOrder> {
    return await this.orderRepository.create(attrs);
  }
}
