import { Db, MongoClient } from "mongodb";
import { AnyTypeObject, Database } from "../contracts/database";

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
        `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`
      );
      global.connection = conn.db(process.env.MONGO_DATABASE_NAME);
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
