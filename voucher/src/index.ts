import './sideEffectImports';
import { getPubSubClient } from '@infrastructure/events';
import { startHttpServer, shutdownHttpServer } from '@api/http';
import { connect, disconnect } from '@infrastructure/repositories/config';
import { watchShutdown } from '@shared/application/utils/watchShutdow';

const HTTP_PORT: number = parseInt(process.env.HTTP_PORT || '3000');

const startApp = async () => {
  await connect();
  await startHttpServer(HTTP_PORT);

  getPubSubClient().initialize();
  getPubSubClient().start();
};

startApp().catch((error) => {
  reportError(error);
  process.abort();
});

watchShutdown(async () => {
  await shutdownHttpServer();
  await disconnect();
});
