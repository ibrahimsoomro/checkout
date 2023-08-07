import { IApplicationEvents } from '@application/events';
import { PubSubEventBus, PublisherFactory } from '@shared/infrastructure/events';
import { IEvents } from './types/IEvents';

let eventBus: PubSubEventBus<IApplicationEvents> | undefined;

export const pubSubEventBus = (): PubSubEventBus<IApplicationEvents> => {
  if (eventBus) {
    return eventBus;
  }

  const publisherFactory = new PublisherFactory<IEvents>();
  eventBus = new PubSubEventBus<IApplicationEvents>({
    'order-sent': publisherFactory.getPublisher('order-svc-order-sent'),
  });

  return eventBus;
};
