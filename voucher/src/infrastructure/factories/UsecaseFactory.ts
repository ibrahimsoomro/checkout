import { IUsecaseFactory } from "@application/factories/IUsecaseFactory";
import {
  IssueVoucherUsecase,
  IIssueVoucherUsecase,
} from "@application/usecases/IssueVoucherUsecase";
import { VoucherRepository } from "@infrastructure/repositories/VoucherRepository";

export class UsecaseFactory implements IUsecaseFactory {
  public createIssueVoucherUseCase(): IIssueVoucherUsecase {
    const voucherRepository = new VoucherRepository();
    return new IssueVoucherUsecase(voucherRepository);
  }
}
