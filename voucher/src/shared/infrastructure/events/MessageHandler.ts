import { ISubscriber } from "./Subscriber";


export abstract class MessageHandler<T = unknown> {
  protected constructor(private readonly subscriber: ISubscriber) {}

  protected abstract handle(event: T): Promise<void>;

  public start() {
    this.subscriber.start(async (msg: string) => {
      await this.handle(JSON.parse(msg));
    });
  }

  public async initialize() {
    await this.subscriber.initialize();
  }

  public async stop() {
    await this.subscriber.stop();
  }
}
