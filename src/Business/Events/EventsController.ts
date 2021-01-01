import { Controller, Get, HttpException, Post, Request, Response } from "nelso/build";
import { CreateDto } from "./Dto/CreateDto";
import { FindByIdQuery } from "./Queries/FindByIdQuery";
import { EventsService } from "./EventsService";
import { FindByTagsDto } from "./Dto/FindByTagsDto";
import { ParticipateDto } from "./Dto/ParticipateDto";
import { AuthMiddleware } from "../Common/Middleware/AuthMiddleware";

@Controller("events")
export class EventsController {
  constructor(private eventsService: EventsService) { }

  //Verificação da sobreposição de eventos?
  @Post("create", [AuthMiddleware])
  async create(req: Request, res: Response) {
    const dto = await req.body(CreateDto);
    await this.eventsService.create(dto);
    res.send({ message: "Event created with success" });
  }

  @Get("findById")
  async findById(req: Request, res: Response) {
    const query = await req.queries(FindByIdQuery);
    res.send(await this.eventsService.findById(query));
  }

  @Get("findByPlace")
  async findByPlace(req: Request, res: Response) {
    const dto = await req.queries(FindByIdQuery);
    res.send(await this.eventsService.findByPlace(dto));
  }

  @Post("findByTags")
  async findByTags(req: Request, res: Response) {
    const dto = await req.body(FindByTagsDto);
    res.send(await this.eventsService.findByTags(dto));
  }

  @Post("participate", [AuthMiddleware])
  async participate(req: Request, res: Response) {
    const dto = await req.body(ParticipateDto);
    await this.eventsService.participate(dto, req.user);
    res.send({ message: "User registered in event" });
  }
}
