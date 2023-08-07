import Redis from 'ioredis';

export class Publisher<T = unknown> {
  topicName: string;
  pubsubClient: Redis;

  constructor(topic: string, pubsubClient: Redis) {
    this.topicName = topic;
    this.pubsubClient = pubsubClient;
  }

  async publishMsg(data: T): Promise<void> {
    await this.pubsubClient.publish(this.topicName, JSON.stringify(data));
  }
}
