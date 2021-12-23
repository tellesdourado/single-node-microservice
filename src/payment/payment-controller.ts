import { Controller } from "../app/entities/controller";
import { ProducerService } from "./services/producer";
import { HttpRequest, HttpResponse } from "../app/entities/http";

interface Body {
  topic: string;
  message: string;
}

export class PaymentController implements Controller {
  constructor(private producerService: ProducerService) {}
  async action(request: HttpRequest<Body>): Promise<HttpResponse> {
    const { topic, message } = request.body;

    await this.producerService.run({ topic, message });

    return {
      statusCode: 201,
      body: { message, status: "added" },
    } as HttpResponse;
  }
}
