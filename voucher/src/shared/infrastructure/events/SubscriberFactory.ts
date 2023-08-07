import Redis from 'ioredis';
import { ISubscriber, Subscriber } from './Subscriber';

const REDIS_PORT: number = parseInt(process.env.REDIS_PORT || '6379');
const REDIS_HOST: string = process.env.REDIS_HOST || 'localhost';

export class SubscriberFactory {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis(REDIS_PORT, REDIS_HOST);
  }

  getSubscriber(topicName: string): ISubscriber {
    return new Subscriber(topicName, this.client);
  }
}
