export interface ConsumerConfig {
  topic: string;
  quantity?: number;
}
export interface ProducerConfig {
  topic: string;
  message: string;
  headers?: unknown;
}

export interface Headers {
  [key: string]: string;
}

export interface ActionParameters {
  headers?: unknown;
  message: string;
}
export type ActionFunction = (parameters: ActionParameters) => Promise<unknown>;

export type ConsumerResponse = (
  message: string,
  header?: unknown
) => Promise<unknown>;

export interface ConsumerCtrlParams {
  action: ActionFunction;
  response: ConsumerResponse;
  dlq: ConsumerResponse;
}

export type ConsumerCtrl = (params: ConsumerCtrlParams) => Promise<void>;

export type EventType = "consumer" | "producer";

export interface EventIngester {
  consumer(data: ConsumerConfig, action?: ActionFunction): Promise<void>;
  consumerCtrl(data: ConsumerConfig, params: ConsumerCtrlParams): Promise<void>;
  producer(data: ProducerConfig): Promise<void>;
  delete(metadata: unknown): Promise<boolean>;
  init(type: EventType): Promise<this>;
  disconnect(type: EventType): Promise<this>;
}
