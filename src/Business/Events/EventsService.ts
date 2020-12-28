import { Injectable } from "nelso/build/decorators/DiDecorators";
import { DatabaseService } from "../../Infrastructure/Database/DatabaseService";
import { CreateDto } from "./dto/CreateDto";

@Injectable()
export class EventsService {
  constructor(private databaseService: DatabaseService) {}

  async create(createDto: CreateDto) {
    const { databaseService } = this;
    const event = databaseService.events().create(createDto);
    await databaseService.events().save(event);
  }
}
