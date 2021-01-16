import { Di, Provider, Types } from "kioto/build";
import { EventsController } from "./EventsController";
import { Injectable } from "kioto/build/decorators/DiDecorators";
import { EventsService } from "./EventsService";

@Injectable()
export class EventsProvider extends Provider {
  register(): void {
    Di.bind(Types.Controller).to(EventsController);
    Di.bind(EventsService).toSelf();
  }

  boot(): void {}
}
