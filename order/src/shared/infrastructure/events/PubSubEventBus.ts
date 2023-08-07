import { IEventBus } from '@shared/application/events';
import { IPublisher } from '../../application/events/IPublisher';


export class PubSubEventBus<T> implements IEventBus<T> {
  constructor(private readonly publisherMap: { [K in keyof T]: IPublisher<T[K]> }) {}

  public publish<K extends keyof T>(topic: K, msg: T[K]): void {
    const publisher = this.publisherMap[topic];

    if (!publisher) {
      throw new Error(`Publisher not registered ${topic.toString()}`);
    }

    publisher.publishMsg(msg).catch((err: any) => {
      console.error(err);
    });
  }
}
