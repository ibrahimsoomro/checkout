import { IPublisher } from './IPublisher';

export declare class PublisherFactory<T> {
  public getPublisher<K extends keyof T>(topic: K): IPublisher<T[K]>;
}
