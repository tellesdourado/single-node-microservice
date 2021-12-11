import { Db, MongoClient } from "mongodb";
import { AnyTypeObject, Database } from "../../entities/database";
import { environments } from "../../../utils/environments";

export class MongoAdapter implements Database {
  private _connection: Db;
  private _table: string;

  setTable(table: string): this {
    this._table = table;
    return this;
  }

  async insertMany(data: unknown[]): Promise<string[]> {
    const manyInserts = await this._connection
      .collection(this._table)
      .insertMany(data);
    return Object.values(manyInserts.insertedIds).map((id) => id.toString());
  }
  async findById(id: string): Promise<unknown> {
    return await this._connection.collection(this._table).findOne({ _id: id });
  }
  async findByFields(fields: AnyTypeObject): Promise<unknown[]> {
    return await this._connection
      .collection(this._table)
      .find(fields)
      .toArray();
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

  async insertOne(data: unknown): Promise<string> {
    const result = await this._connection
      .collection(this._table)
      .insertOne(data);
    return result.insertedId.toString();
  }
}
