import { KafkaAdapter } from "../adapters/kafka-adapter";
import { MongoAdapter } from "../adapters/mongo-adatper";
import { ConsumerService } from "../services/consumer";
import { ProducerService } from "../services/producer";

const kafkaAdapter = new KafkaAdapter();
const mongoAdapter = new MongoAdapter();

// const [, , flag, value, options] = process.argv;

export = async () => {
  const producer = new ProducerService(await kafkaAdapter.init("producer"));
  const consumer = new ConsumerService(
    await kafkaAdapter.init("consumer"),
    mongoAdapter
  );

  return { producer, consumer };
};

// (async () => {
//   switch (flag) {
//     case "--send":
//       if (!value) return console.error("Message Is Missing");
//       (await producer.run({ topic: value, message: options }))
//         ? console.log("Message Sended")
//         : console.log("Message Not Sended");
//       break;
//     case "--receive":
//       await consumer.run({
//         topic: value,
//         quantity: options ? Number(options) : 1,
//       });
//       break;
//   }
// })();
