import { EventIngester } from "../../entities/event-ingester";
import { Controller } from "../../entities/server/controller";
import { HttpRequest, HttpResponse } from "../../entities/server/http";
import { ProducerService } from "../../services/producer";

export class ProducerController implements Controller {
  constructor(private producerService: ProducerService) {}
  async action(request: HttpRequest): Promise<HttpResponse> {
    const { topic, message } = request.body;

    await this.producerService.run({ topic, message });

    return {
      statusCode: 201,
      body: { message, status: "added" },
    } as HttpResponse;
  }
}
