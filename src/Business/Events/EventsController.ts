import { Controller, Post, Request, Response } from "nelso/build";
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
