import { EntityManager } from "typeorm";
import { IVoucher } from "@application/dto/IVoucher";
import {
  IVoucherRepository,
  ICreateVoucherRequest,
} from "@application/repositories/IVoucherRepository";
import { dataSource } from "./config";
import { VoucherEntity } from "./entities/VoucherEntity";

export class VoucherRepository implements IVoucherRepository {
  constructor(private readonly manager: EntityManager = dataSource.manager) {}

  public async create(attrs: ICreateVoucherRequest): Promise<IVoucher> {
    return await this.manager.save(VoucherEntity, attrs);
  }

  public async findOneBy(
    attrs: Partial<IVoucher>
  ): Promise<IVoucher | undefined> {
    const res = await this.manager.findOneBy(VoucherEntity, attrs);
    return res || undefined;
  }

  public async findBy(attrs: Partial<IVoucher>): Promise<IVoucher[]> {
    const res = await this.manager.findBy(VoucherEntity, attrs);
    return res.length ? res : [];
  }
}
