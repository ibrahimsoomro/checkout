import { IOrderRepository } from '@application/repositories/IOrderRepository';
import { setupDb } from '@shared/__tests__/support/setupDb';
import { OrderRepository } from '../OrderRepository';
import { ProductsFactory } from './factories/ProductsFactory';

setupDb();

describe('OrderRepository', () => {
  let repository: IOrderRepository;

  beforeAll(() => {
    repository = new OrderRepository();
  });

  describe('create', () => {
    it('should create', async () => {
      const product = await ProductsFactory.create({
        name: 'Fresh',
        price: 1000,
      });

      const res = await repository.create({
        total: 100,
        products: [product],
      });

      expect(res).toBeDefined();
    });
  });
});
