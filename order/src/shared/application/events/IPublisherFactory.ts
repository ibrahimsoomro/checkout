import { IPublisher } from './IPublisher';

export interface IPublisherFactory<T> {
  getPublisher<K extends keyof T>(topic: K): IPublisher<T[K]>;
}
