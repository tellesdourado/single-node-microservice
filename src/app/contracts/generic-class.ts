export interface GenericClass extends Function {
  new (...args: any[]): unknown;
}
