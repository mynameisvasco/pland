import { Injectable } from "nelso/build";
import { Connection, createConnection } from "typeorm";
import { Event } from "../../Domain/Entities/Event";
import { Place } from "../../Domain/Entities/Place";
import { Service } from "../../Domain/Entities/Service";
import { ServiceSupplier } from "../../Domain/Entities/ServiceSupplier";
import { Ticket } from "../../Domain/Entities/Ticket";
import { User } from "../../Domain/Entities/User";

@Injectable()
export class DatabaseService {
  private db: Connection;

  async boot() {
    this.db = await createConnection({
      type: "sqlite",
      database: "db.sql",
      entities: [Event, Place, Service, ServiceSupplier, Ticket, User],
      synchronize: true,
    });
  }

  get events() {
    return this.db.getRepository(Event);
  }

  get users() {
    return this.db.getRepository(User);
  }

  get places() {
    return this.db.getRepository(Place);
  }

  get services() {
    return this.db.getRepository(Service);
  }

  get serviceSuppliers() {
    return this.db.getRepository(ServiceSupplier);
  }

  get tickets() {
    return this.db.getRepository(Ticket);
  }
}
