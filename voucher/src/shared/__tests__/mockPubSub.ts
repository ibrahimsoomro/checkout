import { Publisher, Subscriber } from "@shared/infrastructure/events";

type AsyncCallback = (msg: string) => Promise<void>;

interface IPubSubPublishersMock<PubSubEvents> {
  getPublishedMessages: <K extends keyof PubSubEvents>(
    topicName: K
  ) => Array<PubSubEvents[K]>;
}

interface IPubSubSubscribersMock {
  receiveMessage: (topicName: string, msg: string) => Promise<void>;
}

export const mockSubscribers = (): IPubSubSubscribersMock => {
  let registeredHandlers: Record<string, AsyncCallback> = {};

  beforeAll(() => {
    jest
      .spyOn(Subscriber.prototype, "start")
      .mockImplementation(function (
        this: Subscriber,
        asyncCallback: AsyncCallback
      ) {
        registeredHandlers[this.topicName] = asyncCallback;
      });
  });

  afterEach(() => {
    registeredHandlers = {};
  });

  return {
    receiveMessage: async (topicName: string, msg: string): Promise<void> => {
      const callback = registeredHandlers[topicName.toString()];
      if (!callback) {
        throw new Error(
          `Cannot find registered callback for subscription ${topicName.toString()}`
        );
      }

      await callback(msg).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        throw error;
      });
    },
  };
};

export const mockPublishers = <P>(): IPubSubPublishersMock<P> => {
  let publishedMessages: { [K in keyof P]?: Array<P[K]> } = {};

  beforeAll(() => {
    jest
      .spyOn(Publisher.prototype, "publishMsg")
      .mockImplementation(function <K extends keyof P>(
        this: Publisher,
        msg: P[K]
      ) {
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
