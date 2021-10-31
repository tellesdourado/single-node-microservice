export interface AnyTypeObject {
  [key: string]: any;
}

export interface Database {
  insertMany?(data: any[]): Promise<string[]>;
  findById?(id: string): Promise<any>;
  findByFields?(fields: AnyTypeObject): Promise<any[]>;
  insertOne?(data: any): Promise<any>;
  createConnection(): Promise<this>;
  setTable(name: string): this;
}
