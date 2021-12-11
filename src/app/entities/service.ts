export interface Service {
  run(data: unknown): Promise<unknown>;
}
