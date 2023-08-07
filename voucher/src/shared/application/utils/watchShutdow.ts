export const state = { isShutdown: false };

export const watchShutdown = (shutdownFn: () => Promise<void>) => {
  process.on('SIGTERM', async () => {
    console.log('Got SIGTERM. Graceful shutdown start');
    state.isShutdown = true;
    try {
      await shutdownFn();
      console.log('Graceful shutdown finished');
      process.exit();
    } catch (e) {
      console.error('Shutdown error', e);
      process.abort();
    }
  });
};
