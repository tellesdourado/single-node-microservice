import { ProducerConsumer } from "../entities/producer-consumer";

export class KafkaAdapter implements ProducerConsumer {
  async consumer(quantity: number): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async producer<T>(data: T): Promise<boolean> {
    const post = async (data: string) => {};
    try {
      if (Array.isArray(data)) {
        await Promise.all(
          data.map(async (value) => {
            return await post(value);
          })
        );
      }

      if (typeof data === "string") {
        await post(data);
      }
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
