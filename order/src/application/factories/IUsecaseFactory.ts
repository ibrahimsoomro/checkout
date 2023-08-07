import { ICreateOrderUsecase } from '@application/usecases/CreateOrderUsecase';

export interface IUsecaseFactory {
  createOrderUsecase: () => ICreateOrderUsecase;
}
