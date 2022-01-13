// export interface AnyTypeObject {
//   [key: string]: unknown;
// }

export abstract class Database {
  insertMany: (data: unknown[]) => Promise<string[]>;
  findById: (id: string) => Promise<unknown>;
  find: (fields: Record<string, unknown>) => Promise<unknown[]>;
  insertOne: (data: object) => Promise<unknown>;
  // createConnection: () => Promise<this>;
  collection: (name: string) => this;
}
