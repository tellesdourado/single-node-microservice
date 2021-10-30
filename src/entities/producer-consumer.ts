export interface ConsumerConfig {
  topic: string;
  quantity: number;
}
export interface ProducerConfig {
  topic: string;
  message: string;
}
export interface ProducerConsumer {
  consumer(data: ConsumerConfig): Promise<void>;
  producer(data: ProducerConfig): Promise<boolean>;
}
