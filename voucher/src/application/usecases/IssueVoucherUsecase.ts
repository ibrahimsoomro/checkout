import { IVoucher } from "@application/dto/IVoucher";
import { IVoucherRepository } from "@application/repositories/IVoucherRepository";
import { IUsecase } from "@shared/application/IUsecase";
import { generateVoucherCode } from "@shared/application/utils/generateVoucherCode";

const DEFAULT_VOUCHER_AMOUNT = 5; // can be set as an ENV variable
export interface IIssueVoucherAttrs {
  orderId: number;
}

export type IIssueVoucherUsecase = IUsecase<
  IIssueVoucherAttrs,
  IVoucher | undefined
>;

export class IssueVoucherUsecase implements IIssueVoucherUsecase {
  constructor(private readonly voucherRepository: IVoucherRepository) {}
  public async execute(
    attrs: IIssueVoucherAttrs
  ): Promise<IVoucher | undefined> {
    const voucher = await this.voucherRepository.findOneBy({
      orderId: attrs.orderId,
    });

    if (voucher) {
      return;
    }

    const code = await this.generateVoucherCode();
    const order = await this.voucherRepository.create({
      orderId: attrs.orderId,
      code,
      amount: DEFAULT_VOUCHER_AMOUNT,
    });
    return order;
  }

  public async generateVoucherCode(): Promise<string> {
    const code = generateVoucherCode();
    const voucher = await this.voucherRepository.findOneBy({ code });

    if (voucher) {
      return this.generateVoucherCode();
    }
    return code;
  }
}
