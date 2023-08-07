import { UsecaseFactory } from '@infrastructure/factories/UsecaseFactory';
import { OrderRepository } from '../../../infrastructure/repositories/OrderRepository';
import {
  ICreateRequest,
  ICreateResponse,
  IOrderController,
  IStatusUpdateRequest,
  IStatusUpdateResponse,
} from './types';

export class OrderController implements IOrderController {
  public async create(req: ICreateRequest): Promise<ICreateResponse> {
    const usecase = new UsecaseFactory().createOrderUsecase();
    return await usecase.execute(req);
  }

  public async statusUpdate(req: IStatusUpdateRequest): Promise<IStatusUpdateResponse> {
    const usecase = new UsecaseFactory().updateOrderUsecase();
    return await usecase.execute(req);
  }
}
