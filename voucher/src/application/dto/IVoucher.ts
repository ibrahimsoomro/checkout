export interface IVoucher {
  id: number;
  orderId: number;
  code: string;
  amount: number;
  createdAt: Date;
}
