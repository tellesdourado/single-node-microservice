import { KafkaAdapter } from "../adapters/kafka-adapter";
import { ConsumerService } from "../services/consumer";
import { ProducerService } from "../services/producer";

const kafkaAdapter = new KafkaAdapter();
const producer = new ProducerService(kafkaAdapter);
const consumer = new ConsumerService(kafkaAdapter);

const [, , flag, value, options] = process.argv;

(async () => {
  switch (flag) {
    case "--send":
      if (!value) return console.error("Message Is Missing");
      (await producer.run({ topic: value, message: options }))
        ? console.log("Message Sended")
        : console.log("Message Not Sended");
      break;
    case "--receive":
      await consumer.run({
        topic: value,
        quantity: options ? Number(options) : 1,
      });
      break;
  }
})();