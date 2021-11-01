import gateway from "../gateway";

(async () => {
  const { producer, consumer } = await gateway();
  setInterval(async () => {
    producer.run({ message: "test", topic: "stream" });
  }, 1);

  consumer.run({ topic: "stream", quantity: 1 });
})();
