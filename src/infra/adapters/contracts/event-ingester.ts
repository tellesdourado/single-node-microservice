import { GenericClass } from "../../../app/contracts/generic-class";
import { DtoValidator } from "../../../kernel/contracts/dto-validator";

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

export interface ActionParameters<T> {
  headers?: unknown;
  data: T;
}
export type ActionFunction = (
  parameters: ActionParameters<unknown>
) => Promise<unknown>;

export type ConsumerResponse = (
  message: string,
  header?: unknown
) => Promise<unknown>;

export interface ConsumerCtrlParams {
  action: ActionFunction;
  response: ConsumerResponse;
  dlq: ConsumerResponse;
  dto?: FunctionConstructor;
}

export type ConsumerCtrl = (params: ConsumerCtrlParams) => Promise<void>;

export type EventType = "consumer" | "producer";

export abstract class EventIngester {
  consumer: (data: ConsumerConfig, action?: ActionFunction) => Promise<void>;
  controller?: (
    data: ConsumerConfig,
    params: ConsumerCtrlParams
  ) => Promise<void>;
  producer: (data: ProducerConfig) => Promise<void>;
  delete: (metadata: unknown) => Promise<void>;
  init: (type: EventType) => Promise<this>;
  disconnect: (type: EventType) => Promise<this>;
}
