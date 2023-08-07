import express, { Application } from 'express';
import { state } from '@shared/application/utils/watchShutdow';
import { OrdersRouter } from '@api/http/orders/OrdersRouter';
import bodyParser from 'body-parser';
import { checkConnection } from '@infrastructure/repositories/config';

export const createApp = (): Application => {
  const app = express();

  applyConfig(app);
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/healthz', (_, res) => {
    checkConnection(); 
    res.status(200).send('OK')
  });
  app.get('/readiness', (_, res) => {
    if (state.isShutdown) {
      res.status(500).send('shutting down');
    } else {
      res.status(200).send('OK');
    }
  });

  app.use('/order', OrdersRouter);

  return app;
};

function applyConfig(app: Application) {
  app.disable('x-powered-by');
  app.set('trust proxy', true);
}
