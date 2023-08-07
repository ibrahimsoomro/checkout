import { IVoucher } from "@application/dto/IVoucher";

export interface ICreateVoucherRequest {
  orderId: number;
  code: string;
  amount: number;
}

export interface IVoucherRepository {
  create(req: ICreateVoucherRequest): Promise<IVoucher>;
  findOneBy(attrs: Partial<IVoucher>): Promise<IVoucher | undefined>;
  findBy(attrs: Partial<IVoucher>): Promise<IVoucher[]>;
}
