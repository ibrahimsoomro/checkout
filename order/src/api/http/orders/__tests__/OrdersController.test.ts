import request from 'supertest';
import { createApp } from '@api/http/app';
import { setupDb } from '@shared/__tests__/support/setupDb';
import { ProductsFactory } from '@infrastructure/repositories/__tests__/factories/ProductsFactory';
import { mockPublishers } from '../../../../shared/__tests__/mockPubSub';
import { IEvents } from '@infrastructure/events/types/IEvents';
import { OrdersFactory } from '@infrastructure/repositories/__tests__/factories/OrdersFactory';
import { IOrder } from '@application/dto/IOrder';

setupDb();
jest.mock('ioredis');

const publishersMock = mockPublishers<IEvents>();

describe('Orders', () => {
  const app = createApp();

  describe('createOrder', () => {
    it('should create order', async () => {
      const product = await ProductsFactory.create({
        name: 'Fresh',
        price: 1000,
      });

      const response = await request(app)
        .post('/order/create')
        .send({
          total: 100,
          products: [product],
        })
        .expect(200);

      const result = {
        total: 100,
        id: expect.any(Number),
        products: expect.arrayContaining([
          expect.objectContaining({
            id: product.id,
          }),
        ]),
      };

      expect(response.body).toEqual(expect.objectContaining(result));
    });
  });

  describe('statusUpdate', () => {
    it('should update order', async () => {
      const product = {
        name: 'Fresh',
        price: 1000,
      };
      const order = await OrdersFactory.create({
        total: 120,
        products: [product],
        status: 'PENDING',
      } as IOrder);

      const response = await request(app)
        .post('/order/status-update')
        .send({
          id: order.id,
          status: 'SENT',
        })
        .expect(200);

      const result = {
        id: order.id,
        total: response.body.total,
        status: 'SENT',
      };

      expect(response.body).toEqual(expect.objectContaining(result));
      expect(publishersMock.getPublishedMessages('order-svc-order-sent')).toEqual([{ ...result }]);
    });
  });
});
