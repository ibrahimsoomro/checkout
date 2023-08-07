import { Router, NextFunction } from 'express';
import { OrderController } from './OrdersController';

export const OrdersRouter = Router();

OrdersRouter.post('/create', async (req, res, next: NextFunction) => {
  const orderController = new OrderController();
  try {
    const order = await orderController.create(req.body);
    return res.status(200).send(order);
  } catch (err) {
    next(err);
  }
});

OrdersRouter.post('/status-update', async (req, res, next: NextFunction) => {
  const orderController = new OrderController();
  try {
    const order = await orderController.statusUpdate(req.body);
    return res.status(200).send(order);
  } catch (err) {
    next(err);
  }
});
