import { Injectable } from "nelso/build/decorators/DiDecorators";
import { Connection, createConnection } from "typeorm";
import { Event } from "../../Domain/Entities/Event";

@Injectable()
export class DatabaseService {
  private db: Connection;

  async boot() {
    this.db = await createConnection({
      type: "sqlite",
      database: "db.sql",
      entities: [Event],
      synchronize: true,
    });
  }

  events() {
    return this.db.getRepository(Event);
  }

  users() {}

  places() {}
}
