import { IUsecaseFactory } from '@application/factories/IUsecaseFactory';
import { CreateOrderUsecase, ICreateOrderUsecase } from '@application/usecases/CreateOrderUsecase';
import { IUpdateOrderUsecase, UpdateOrderUsecase } from '@application/usecases/UpdateOrderUsecase';
import { pubSubEventBus } from '@infrastructure/events/pubSubEventBus';
import { OrderRepository } from '@infrastructure/repositories/OrderRepository';

export class UsecaseFactory implements IUsecaseFactory {
  public createOrderUsecase(): ICreateOrderUsecase {
    const orderRepository = new OrderRepository();
    return new CreateOrderUsecase(orderRepository);
  }

  public updateOrderUsecase(): IUpdateOrderUsecase {
    const orderRepository = new OrderRepository();
    const eventBus = pubSubEventBus();
    return new UpdateOrderUsecase(orderRepository, eventBus);
  }
}
