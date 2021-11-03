import express from "express";
import fs from "fs";
import path from "path";
import { KafkaAdapter } from "../../adapters/kafka-adapter";
import { HttpRequest } from "../../entities/server/http";
import { ProducerService } from "../../services/producer";
import { ProducerController } from "../controllers/producer-controller";

const app = express();

app.use(express.json());

(async () => {
  const kafkaAdapter = new KafkaAdapter();
  const producerService = new ProducerService(
    await kafkaAdapter.init("producer")
  );
  app.post("/api", async (req, res) => {
    const producerController = new ProducerController(producerService);
    const request = {} as HttpRequest;
    request.body = req.body;
    const response = await producerController.action(request);
    return res.status(response.statusCode).send(response.body);
  });
  app.listen(3333, () => {
    console.log("ok");
  });
})();
