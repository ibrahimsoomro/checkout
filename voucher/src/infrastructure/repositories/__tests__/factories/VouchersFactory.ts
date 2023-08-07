import { IVoucher } from "@application/dto/IVoucher";
import { dataSource } from "../../config";
import { VoucherEntity } from "../../entities/VoucherEntity";

export const VouchersFactory = {
  create: async (attributes: IVoucher) => {
    const entity = dataSource.manager.create(VoucherEntity, attributes);
    return await dataSource.manager.save(entity);
  },
};
