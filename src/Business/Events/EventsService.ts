import { Injectable } from "nelso/build";
import { DatabaseService } from "../../Infrastructure/Database/DatabaseService";
import { CreateDto } from "./Dto/CreateDto";
import { FindByIdQuery } from "./Queries/FindByIdQuery";
import { FindByTagsDto } from "./Dto/FindByTagsDto";
import { HttpException } from "nelso/build/HttpException";
import { PlacesService } from "../Places/PlacesService";
import { Like } from "typeorm";

@Injectable()
export class EventsService {
  constructor(
    private dbService: DatabaseService,
    private placesServices: PlacesService
  ) { }

  async create(dto: CreateDto) {
    const { dbService } = this;
    const event = dbService.events.create(dto);
    await dbService.events.save(event).catch((e) => {
      throw new HttpException(
        "It was not possible to create an event.",
        400
      );
    });
  }

  async findById(query: FindByIdQuery) {
    return await this.dbService.events.findOne(query.id);
  }

  async findByPlace(query: FindByIdQuery) {
    const { dbService, placesServices } = this;
    const place = await placesServices.findById(parseInt(query.id));
    return await dbService.events.find({ where: { place } });
  }

  async findByTags(dto: FindByTagsDto) {
    const { dbService } = this;
    return await dbService.events.find({ where: { _tags: Like(`%${dto.tags.join(",")}%`) } });
  }



}
