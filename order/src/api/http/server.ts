import { once } from 'events';
import { Server } from 'http';
import { promisify } from 'util';
import { createApp } from './app';

let httpServer: Server | undefined;

export const startHttpServer = async (port = 0): Promise<void> => {
  const app = createApp();

  httpServer = app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
  });

  await once(httpServer, 'listening');
};

export const shutdownHttpServer = async (): Promise<void> => {
  console.log('Shutting down HTTP server');

  if (!httpServer) {
    return;
  }

  const stopServer = promisify(httpServer.close.bind(httpServer));
  await stopServer().then(
    () => {
      console.log('Shut down HTTP server');
    },
    (error: Error) => {
      console.error('Error when shutting down HTTP server', { error });
    }
  );
};
