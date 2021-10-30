export interface ProducerConsumer {
  consumer(quantity: number): Promise<string>;
  producer<T>(data: T): Promise<boolean>;
}
