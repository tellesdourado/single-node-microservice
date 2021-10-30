export interface Service {
  run(data: any): Promise<any>;
}
