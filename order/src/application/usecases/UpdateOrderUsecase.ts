import { IOrder } from "@application/dto/IOrder";
import { IEventBus } from "@application/events";
import { IOrderRepository } from "@application/repositories/IOrderRepository";
import { IUsecase } from "@shared/application/IUsecase";

export type IUpdateOrderUsecase = IUsecase<Partial<IOrder>, IOrder>;

export const MINIMUM_ORDER_AMOUNT_FOR_VOUCHER = 100;

export class UpdateOrderUsecase implements IUpdateOrderUsecase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly applicationPubSubEventBus: IEventBus
  ) {}
  public async execute(attrs: Partial<IOrder>): Promise<IOrder> {
    if (!attrs.id) {
      throw new Error("OrderId is required.");
    }
    const order = await this.orderRepository.update(attrs.id, attrs);

    if (
      order &&
      attrs.status === "SENT" &&
      order.total > MINIMUM_ORDER_AMOUNT_FOR_VOUCHER
    ) {
      this.applicationPubSubEventBus.publish("order-sent", {
        id: order.id,
        status: order.status,
        total: order.total,
      });
    }
    return order;
  }
}
