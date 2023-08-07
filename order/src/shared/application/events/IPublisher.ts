export interface IPublisher<T> {
  topicName: string;
  publishMsg: (data: T) => Promise<void>;
}
