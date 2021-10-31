import { AnyTypeObject, Database } from "../entities/database";

import { Db, MongoClient } from "mongodb";
import { environments } from "../utils/environments";

export class MongoAdapter implements Database {
  private _connection: Db;
  private _table: string;

  setTable(table: string): this {
    this._table = table;
    return this;
  }

  insertMany?(data: any[]): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  findById?(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findByFields?(fields: AnyTypeObject): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  async createConnection(): Promise<this> {
    if (!global.database) {
      const conn = await MongoClient.connect(
        `mongodb://${environments.mongo.username}:${environments.mongo.password}@${environments.mongo.host}:${environments.mongo.port}`
      );
      global.connection = conn.db(environments.mongo.database);
    }
    this._connection = global.connection;
    return this;
  }

  async insertOne(data: any) {
    const result = await this._connection
      .collection(this._table)
      .insertOne(data);
    return result.insertedId;
  }
}
