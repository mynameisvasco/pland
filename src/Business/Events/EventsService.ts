import { Injectable } from "kioto/build";
import { DatabaseService } from "../../Infrastructure/Database/DatabaseService";
import { CreateDto } from "./Dto/CreateDto";
import { ParticipateDto } from "./Dto/ParticipateDto";
import { FindByTagsDto } from "./Dto/FindByTagsDto";
import { HttpException } from "kioto/build/HttpException";
import { PlacesService } from "../Places/PlacesService";
import { Like } from "typeorm";
import { UsersService } from "../Users/UsersService";
import { AuthedUser } from "../../Domain/Models/AuthedUser";
import { addMinutes } from "date-fns";
import { OpenRouteService } from "../../Infrastructure/Location/OpenRouteService";
import { FindByLocationDto } from "./Dto/FindByLocationDto";

@Injectable()
export class EventsService {
  constructor(
    private dbService: DatabaseService,
    private placesServices: PlacesService,
    private usersService: UsersService,
    private openRouteService: OpenRouteService
  ) {}

  async create(dto: CreateDto) {
    const { dbService, placesServices } = this;
    const place = await placesServices.findById(dto.placeId, ["events"]);
    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(addMinutes(startsAt, dto.duration));
    if (!this.placesServices.isPlaceAvailableAt(place, startsAt, endsAt)) {
      throw new HttpException(`Place is not available at ${startsAt}`, 400);
    }
    const event = dbService.events.create(dto);
    event.place = place;
    await dbService.events.save(event).catch((e) => {
      throw new HttpException("It was not possible to create an event.", 400);
    });
  }

  async findById(id: number) {
    return await this.dbService.events.findOne(id, {
      relations: ["place", "goers"],
    });
  }

  async findByLocation(dto: FindByLocationDto) {
    const { dbService, openRouteService } = this;
    const events = await dbService.events.find({
      relations: ["place", "goers"],
    });
    return events.filter(
      (e) =>
        openRouteService.distanceInKm(dto.coordinates, e.place.location) <= 20
    );
  }

  async findByNameLike(name: string) {
    return await this.dbService.events.find({
      where: { name: Like(`%${name}%`) },
      relations: ["goers", "place"],
    });
  }

  async findByTags(dto: FindByTagsDto) {
    const { dbService } = this;
    return await dbService.events.find({
      where: { _tags: Like(`%${dto.tags.join(",")}%`) },
      relations: ["goers", "place"],
    });
  }

  async addParticipation(dto: ParticipateDto, authedUser: AuthedUser) {
    const { dbService, usersService } = this;
    const event = await dbService.events.findOne(dto.eventId, {
      relations: ["goers"],
    });
    if (event.isFull()) {
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

  async removeParticipation(dto: ParticipateDto, authedUser: AuthedUser) {
    const { dbService } = this;
    const event = await dbService.events.findOne(dto.eventId, {
      relations: ["goers"],
    });
    if (!event.goers?.map((g) => g.id).includes(authedUser.id)) {
      throw new HttpException("User is not registered in this event.", 400);
    }
    event.goers = event.goers.filter((g) => g.id !== authedUser.id);
    await dbService.events.save(event);
  }
}
