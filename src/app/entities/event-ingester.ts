export interface ConsumerConfig {
  topic: string;
  quantity?: number;
}
export interface ProducerConfig {
  topic: string;
  message: string;
}

export interface ActionParameters {
  response?: unknown;
  metadata?: unknown;
  message: string;
}
export type ActionFunction = (parameters: ActionParameters) => Promise<unknown>;

export type EventType = "consumer" | "producer";

export interface EventIngester {
  consumer(data: ConsumerConfig, action?: ActionFunction): Promise<void>;
  producer(data: ProducerConfig): Promise<boolean>;
  delete(metadata: unknown): Promise<boolean>;
  init(type: EventType): Promise<this>;
  disconnect(type: EventType): Promise<this>;
}
