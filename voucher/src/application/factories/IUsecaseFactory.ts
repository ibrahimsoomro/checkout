import { IIssueVoucherUsecase } from "@application/usecases/IssueVoucherUsecase";

export interface IUsecaseFactory {
  createIssueVoucherUseCase: () => IIssueVoucherUsecase;
}
