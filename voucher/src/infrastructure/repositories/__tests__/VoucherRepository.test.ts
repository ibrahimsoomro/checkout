import {
  ICreateVoucherRequest,
  IVoucherRepository,
} from "@application/repositories/IVoucherRepository";
import { setupDb } from "@shared/__tests__/support/setupDb";
import { VoucherRepository } from "../VoucherRepository";

setupDb();

describe("VoucherRepository", () => {
  let repository: IVoucherRepository;

  beforeAll(() => {
    repository = new VoucherRepository();
  });

  describe("create", () => {
    it("should create", async () => {
      const res = await repository.create({
        orderId: 1,
        code: "1232342",
        amount: 100.0,
      });

      expect(res).toBeDefined();
    });

    it("should not create multiple vouchers for single order", async () => {
      await repository.create({ orderId: 1, amount: 5, code: "w12dw" });
      const voucher: ICreateVoucherRequest = {
        orderId: 1,
        code: "w12dw",
        amount: 5,
      };

      await expect(repository.create(voucher)).rejects.toThrow(
        "duplicate key value violates unique constraint"
      );
    });
  });
});
