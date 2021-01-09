import { Injectable } from "nelso/build";
import { DatabaseService } from "../../Infrastructure/Database/DatabaseService";
import { CreateDto } from "./Dto/CreateDto";
import { ParticipateDto } from "./Dto/ParticipateDto";
import { FindByIdQuery } from "./Queries/FindByIdQuery";
import { FindByNameQuery } from "./Queries/FindByNameQuery";
import { FindByTagsDto } from "./Dto/FindByTagsDto";
import { HttpException } from "nelso/build/HttpException";
import { PlacesService } from "../Places/PlacesService";
import { Like } from "typeorm";
import { UsersService } from "../Users/UsersService";
import { AuthedUser } from "../../Domain/Models/AuthedUser";

@Injectable()
export class EventsService {
  constructor(
    private dbService: DatabaseService,
    private placesServices: PlacesService,
    private usersService: UsersService
  ) {}

  async create(dto: CreateDto) {
    const { dbService } = this;
    const event = dbService.events.create(dto);
    await dbService.events.save(event).catch((e) => {
      throw new HttpException("It was not possible to create an event.", 400);
    });
  }

  async findById(query: FindByIdQuery) {
    return await this.dbService.events.findOne(query.id);
  }

  async findByName(query: FindByNameQuery) {
    return await this.dbService.events.findOne(query.name);
  }

  async findByPlace(query: FindByIdQuery) {
    const { dbService, placesServices } = this;
    const place = await placesServices.findById(parseInt(query.id));
    return await dbService.events.find({ where: { place } });
  }

  async findByTags(dto: FindByTagsDto) {
    const { dbService } = this;
    return await dbService.events.find({
      where: { _tags: Like(`%${dto.tags.join(",")}%`) },
    });
  }

  async participate(dto: ParticipateDto, authedUser: AuthedUser) {
    const { dbService, usersService } = this;
    const event = await dbService.events.findOne(dto.eventId, {
      relations: ["goers"],
    });
    if (event.goers.length >= event.attendanceLimit) {
      throw new HttpException(
        "Event already reached maximum attendance limit.",
        400
      );
    }
    const user = await usersService.findByEmail(authedUser.email, [
      "goingEvents",
    ]);
    if (user.goingEvents?.map((e) => e.id).includes(event.id)) {
      throw new HttpException("User is already registered in this event.", 400);
    }
    event.goers.push(user);
    await dbService.events.save(event);
  }
}
