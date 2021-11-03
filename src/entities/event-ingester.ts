export interface ConsumerConfig {
  topic: string;
  quantity: number;
}
export interface ProducerConfig {
  topic: string;
  message: string;
}

export type EventType = "consumer" | "producer";

export interface EventIngester {
  consumer(data: ConsumerConfig): Promise<void>;
  producer(data: ProducerConfig): Promise<boolean>;
  init(type: EventType): Promise<this>;
  disconnect(type: EventType): Promise<this>;
}
