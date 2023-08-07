import express, { Application } from 'express';
import { state } from '@shared/application/utils/watchShutdow';
import bodyParser from 'body-parser';

export const createApp = (): Application => {
  const app = express();

  applyConfig(app);
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/healthz', (_, res) => res.status(200).send('OK'));
  app.get('/readiness', (_, res) => {
    if (state.isShutdown) {
      res.status(500).send('shutting down');
    } else {
      res.status(200).send('OK');
    }
  });

  return app;
};

function applyConfig(app: Application) {
  app.disable('x-powered-by');
  app.set('trust proxy', true);
}
