export interface Class extends Function {
  new (...args: any[]): unknown;
}
