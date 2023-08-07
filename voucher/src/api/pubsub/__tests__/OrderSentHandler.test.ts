import { getPubSubClient } from "@infrastructure/events";
import { VoucherRepository } from "@infrastructure/repositories/VoucherRepository";
import { mockSubscribers } from "@shared/__tests__/mockPubSub";
import { setupDb } from "@shared/__tests__/support/setupDb";
import { VouchersFactory } from "@infrastructure/repositories/__tests__/factories/VouchersFactory";
import { IVoucher } from "@application/dto/IVoucher";
import * as utils from "@shared/application/utils/generateVoucherCode";
import { IOrderSent } from "../OrderSentHandler";

jest.mock("ioredis");
jest.mock("@shared/application/utils/generateVoucherCode");
setupDb();

const subscribersMock = mockSubscribers();

describe("OrderSentHandler", () => {
  beforeEach(() => {
    getPubSubClient().initialize();
    getPubSubClient().start();
  });

  it("create voucher if order is greater than 100 euros", async () => {
    jest
      .spyOn(utils, "generateVoucherCode")
      .mockImplementationOnce(() => {
        return "231ew";
      })
      .mockImplementation(() => "231r");
    const order: IOrderSent = {
      id: 1,
      status: "SENT",
      total: 120,
    } as IOrderSent;
    await subscribersMock.receiveMessage(
      "order-svc-order-sent",
      JSON.stringify(order)
    );

    const voucherRepo = new VoucherRepository();
    const voucher = await voucherRepo.findOneBy({ orderId: order.id });

    expect(voucher?.orderId).toEqual(order.id);
  });

  it("should not create voucher if order is less or equal to 100 euros", async () => {
    const order: IOrderSent = { id: 2, total: 100 } as IOrderSent;
    await subscribersMock.receiveMessage(
      "order-svc-order-sent",
      JSON.stringify(order)
    );

    const voucherRepo = new VoucherRepository();
    const voucher = await voucherRepo.findOneBy({ orderId: order.id });

    expect(voucher).toBeUndefined();
  });

  it("should create non unique code", async () => {
    await VouchersFactory.create({
      orderId: 1,
      code: "231ew",
      amount: 5,
    } as IVoucher);

    const order: IOrderSent = { id: 2, total: 120 } as IOrderSent;
    await subscribersMock.receiveMessage(
      "order-svc-order-sent",
      JSON.stringify(order)
    );

    const voucherRepo = new VoucherRepository();
    const voucher = await voucherRepo.findOneBy({ orderId: order.id });

    expect(voucher?.orderId).toEqual(order.id);
  });

  it("should not create multiple vouchers for single order", async () => {
    await VouchersFactory.create({
      orderId: 1,
      amount: 5,
      code: "w12dw",
    } as IVoucher);
    const order: IOrderSent = { id: 1, total: 120 } as IOrderSent;

    await subscribersMock.receiveMessage(
      "order-svc-order-sent",
      JSON.stringify(order)
    );

    const voucherRepo = new VoucherRepository();
    const vouchers = await voucherRepo.findBy({ orderId: order.id });
    await expect(vouchers).toHaveLength(1);
  });
});
