import Redis from 'ioredis';
import { Publisher } from './Publisher';
import { IPublisher } from '@shared/application/events/IPublisher';
import { IPublisherFactory } from '@shared/application/events/IPublisherFactory';

const REDIS_PORT: number = parseInt(process.env.REDIS_PORT || '6379');
const REDIS_HOST: string = process.env.REDIS_HOST || 'localhost';

export class PublisherFactory<TypeMap> implements IPublisherFactory<TypeMap> {
  client: Redis;

  constructor() {
    this.client = new Redis(REDIS_PORT, REDIS_HOST);
  }

  getPublisher<Topic extends keyof TypeMap>(topic: Topic): IPublisher<TypeMap[Topic]> {
    return new Publisher(topic.toString(), this.client);
  }
}
