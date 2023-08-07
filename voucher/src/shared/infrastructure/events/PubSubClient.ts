import { MessageHandler } from './MessageHandler';

export class PubSubClient {
  private handlers: MessageHandler<unknown>[] = [];

  public registerHandlers(handlers: MessageHandler<unknown>[]): void {
    this.handlers.push(...handlers);
  }

  public start(): void {
    this.handlers.forEach((handler) => {
      handler.start();
    });
  }

  public async initialize(): Promise<void> {
    await Promise.all(this.handlers.map((handler) => handler.initialize()));
  }
}
