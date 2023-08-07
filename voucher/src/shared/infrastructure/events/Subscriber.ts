import { Redis } from 'ioredis';

export interface ISubscriber {
  stop: () => Promise<void>;
  initialize: () => Promise<void>;
  start: (asyncCallback: (message: string) => Promise<void>) => void;
}

export class Subscriber implements ISubscriber {
  readonly topicName: string;
  private readonly client: Redis;

  constructor(topicName: string, client: Redis) {
    this.topicName = topicName;
    this.client = client;
  }

  async initialize(): Promise<void> {
    await this.client.subscribe(this.topicName);
  }

  async stop() {
    await this.client.unsubscribe(this.topicName);
  }

  start(asyncCallback: (message: string) => Promise<void>) {
    this.client.on('error', this.processError.bind(this));
    this.client.on('message', this.processMessage(asyncCallback).bind(this));
  }

  private processMessage(asyncCallback: (message: string) => Promise<void>): (topic: string, message: string) => void {
    const asyncMessageProcessor = async (topic: string, message: string) => {
      if (topic === this.topicName) {
        asyncCallback(message);
      }
    };

    return (topic: string, message: string) =>
      asyncMessageProcessor(topic, message).catch((err: unknown) => {
        throw err;
      });
  }

  private processError(error: unknown): void {
    console.warn(`Subscription ${this.topicName} failed with error`, error);
  }
}
