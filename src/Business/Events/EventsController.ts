import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  Response,
} from "kioto/build";
import { CreateDto } from "./Dto/CreateDto";
import { FindByIdQuery } from "./Queries/FindByIdQuery";
import { EventsService } from "./EventsService";
import { FindByTagsDto } from "./Dto/FindByTagsDto";
import { ParticipateDto } from "./Dto/ParticipateDto";
import { AuthMiddleware } from "../Common/Middleware/AuthMiddleware";
import { FindByNameQuery } from "./Queries/FindByNameQuery";
import { FindByLocationDto } from "./Dto/FindByLocationDto";
import { request } from "http";

@Controller("events")
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post("create", [AuthMiddleware])
  async create(req: Request, res: Response) {
    console.log(req.body);
    const dto = await req.bodyAs(CreateDto);
    await this.eventsService.create(dto);
    res.send({ message: "Event created with success" });
  }

  @Post("findByLocation")
  async findByLocation(req: Request, res: Response) {
    const dto = await req.bodyAs(FindByLocationDto);
    const events = await this.eventsService.findByLocation(dto);
    res.send(events);
  }

  @Get("findById")
  async findById(req: Request, res: Response) {
    const query = await req.queriesAs(FindByIdQuery);
    res.send(await this.eventsService.findById(parseInt(query.id)));
  }

  @Get("findByNameLike")
  async findByNameLike(req: Request, res: Response) {
    const query = await req.queriesAs(FindByNameQuery);
    res.send(await this.eventsService.findByNameLike(query.name));
  }

  @Post("findByTags")
  async findByTags(req: Request, res: Response) {
    const dto = await req.bodyAs(FindByTagsDto);
    res.send(await this.eventsService.findByTags(dto));
  }

  @Post("participate", [AuthMiddleware])
  async addParticipation(req: Request, res: Response) {
    const dto = await req.bodyAs(ParticipateDto);
    await this.eventsService.addParticipation(dto, req.user);
    res.send({ message: "User registered in event" });
  }

  @Put("participate", [AuthMiddleware])
  async removeParticipation(req: Request, res: Response) {
    const dto = await req.bodyAs(ParticipateDto);
    await this.eventsService.removeParticipation(dto, req.user);
    res.send({ message: "User removed from event." });
  }
}
