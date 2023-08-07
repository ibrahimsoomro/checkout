import { OrderSentHandler } from "@api/pubsub/OrderSentHandler";
import { UsecaseFactory } from "@infrastructure/factories/UsecaseFactory";
import { PubSubClient, SubscriberFactory } from "@shared/infrastructure/events";

let pubSubClient: PubSubClient | undefined;

export const getPubSubClient = (): PubSubClient => {
  if (pubSubClient) {
    return pubSubClient;
  }

  pubSubClient = new PubSubClient();

  const useCaseFactory = new UsecaseFactory();
  const eventsSubscriberFactory = new SubscriberFactory();

  pubSubClient.registerHandlers([
    new OrderSentHandler(eventsSubscriberFactory, useCaseFactory),
  ]);

  return pubSubClient;
};
