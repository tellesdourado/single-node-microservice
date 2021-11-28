export interface AnyTypeObject {
  [key: string]: unknown;
}

export interface Database {
  insertMany?(data: unknown[]): Promise<string[]>;
  findById?(id: string): Promise<unknown>;
  findByFields?(fields: AnyTypeObject): Promise<unknown[]>;
  insertOne?(data: unknown): Promise<unknown>;
  createConnection(): Promise<this>;
  setTable(name: string): this;
}
