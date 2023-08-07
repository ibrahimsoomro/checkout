import { IPublisher } from './IPublisher';

export declare class IPublisherFactory<T> {
  public getPublisher<K extends keyof T>(topic: K): IPublisher<T[K]>;
}
