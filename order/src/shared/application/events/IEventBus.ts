export interface IEventBus<T> {
  publish<K extends keyof T>(eventName: K, msg: T[K]): void;
}
