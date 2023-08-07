import { MessageHandler } from "@shared/infrastructure/events/MessageHandler";
import { UsecaseFactory } from "@infrastructure/factories/UsecaseFactory";
import { SubscriberFactory } from "@shared/infrastructure/events";

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  createdAt?: Date;
}

export interface IOrderSent {
  id: number;
  total: number;
  status: string
}

export class OrderSentHandler extends MessageHandler<IOrderSent> {
  constructor(
    subscriberFactory: SubscriberFactory,
    readonly useCaseFactory: UsecaseFactory
  ) {
    super(subscriberFactory.getSubscriber("order-svc-order-sent"));
  }

  public async handle(order: IOrderSent): Promise<void> {
    if (!(order.total > 100)) {
      return;
    }

    const useCase = this.useCaseFactory.createIssueVoucherUseCase();
    await useCase.execute({ orderId: order.id });
  }
}
