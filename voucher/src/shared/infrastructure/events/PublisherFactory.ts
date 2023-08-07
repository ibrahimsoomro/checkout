import Redis from 'ioredis';
import { Publisher } from './Publisher';
import { IPublisher } from '@shared/application/events/IPublisher';

export class PublisherFactory<TypeMap> {
  client: Redis;

  constructor() {
    this.client = new Redis();
  }

  getPublisher<Topic extends keyof TypeMap>(topic: Topic): IPublisher<TypeMap[Topic]> {
    return new Publisher(topic.toString(), this.client);
  }
}
