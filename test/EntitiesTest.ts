import { createConnection } from "typeorm";
import { Event } from "../src/Domain/Entities/Event";
import { Place } from "../src/Domain/Entities/Place";
import { Service } from "../src/Domain/Entities/Service";
import { ServiceSupplier } from "../src/Domain/Entities/ServiceSupplier";
import { Ticket } from "../src/Domain/Entities/Ticket";
import { User } from "../src/Domain/Entities/User";
import { AccountStatus } from "../src/Domain/Enums/AccountStatus";
import { AccountTypes } from "../src/Domain/Enums/AccountTypes";
import { WeekDays } from "../src/Domain/Enums/WeekDays";
import { Coordinates } from "../src/Domain/Models/Coordinates";

async function test() {
  const db = await createConnection({
    type: "sqlite",
    database: "db.sql",
    entities: [Event, Place, Service, ServiceSupplier, Ticket, User],
    synchronize: true,
  });

  const event = new Event();
  event.attendanceLimit = 10;
  event.name = "Churrascada no Deti";
  event.startsAt = new Date();
  event.duration = 5;
  event.needsTicket = true;
  const place = new Place();
  place.name = "Deti";
  place.location = new Coordinates(150, 375);
  place.price = 150;
  place.availableDays = [WeekDays.MONDAY, WeekDays.FRIDAY];
  place.opensAt = new Date();
  place.closesAt = new Date();
  event.place = place;

  const service = new Service();
  service.name = "Rolote de Bifanas";
  service.price = 1.5;

  const user = new User();
  user.age = 19;
  user.name = "Nelso";
  user.email = "email@nelso.com";
  user.password = "123";
  user.status = AccountStatus.ACTIVE;
  user.type = AccountTypes.CLIENT;

  event.goers = [...(event.goers ?? []), user];
  event.services = [...(event.services ?? []), service];

  db.getRepository(User).save(user);
  db.getRepository(Service).save(service);
  db.getRepository(Place).save(place);
  db.getRepository(Event).save(event);
}

test();
