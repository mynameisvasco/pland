import { Controller, Post } from "nelso/build/decorators/RoutingDecorators";
import { Request } from "nelso/build/Request";
import { Response } from "nelso/build/Response";
import { CreateDto } from "./dto/CreateDto";
import { EventsService } from "./EventsService";

@Controller("events")
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post("create")
  async create(req: Request, res: Response) {
    const dto = await req.body(CreateDto);
    await this.eventsService.create(dto);
    res.send({ message: "Event created with success" });
  }
}
