import { Publisher } from '@shared/infrastructure/events';

interface IPubSubPublishersMock<PubSubEvents> {
  getPublishedMessages: <K extends keyof PubSubEvents>(topicName: K) => Array<PubSubEvents[K]>;
}

export const mockPublishers = <P>(): IPubSubPublishersMock<P> => {
  let publishedMessages: { [K in keyof P]?: Array<P[K]> } = {};

  beforeAll(() => {
    jest
      .spyOn(Publisher.prototype, 'publishMsg')
      .mockImplementation(function <K extends keyof P>(this: Publisher, msg: P[K]) {
        const topic = this.topicName as K;
        const topicMessages: Array<P[K]> = publishedMessages[topic] ?? [];
        publishedMessages[topic] = [...topicMessages, msg];
        return Promise.resolve();
      });
  });

  afterEach(() => {
    publishedMessages = {};
  });

  return {
    getPublishedMessages: <K extends keyof P>(topicName: K): Array<P[K]> => {
      return publishedMessages[topicName] || [];
    },
  };
};
