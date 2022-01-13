import { Db, MongoClient } from "mongodb";
import { Database } from "../contracts/database";

export class MongoAdapter implements Database {
  private _connection: Db;
  private _collection: string;

  collection(collection: string): this {
    this._collection = collection;
    return this;
  }

  find: (fields: Record<string, unknown>) => Promise<unknown[]>;

  async insertMany(data: unknown[]): Promise<string[]> {
    const manyInserts = await this._connection
      .collection(this._collection)
      .insertMany(data);
    return Object.values(manyInserts.insertedIds).map((id) => id.toString());
  }
  async findById(id: string): Promise<unknown> {
    return await this._connection
      .collection(this._collection)
      .findOne({ _id: id });
  }

  async init(): Promise<this> {
    const conn = await MongoClient.connect(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`
    );

    this._connection = conn.db(process.env.MONGO_DATABASE_NAME);
    return this;
  }

  async insertOne(data: object): Promise<string> {
    const result = await this._connection
      .collection(this._collection)
      .insertOne(data);
    return result.insertedId.toString();
  }
}
