import { Provider } from "nelso/build/Provider";
import { Di, Types } from "nelso/build/Di";
import { EventsController } from "./EventsController";
import { Injectable } from "nelso/build/decorators/DiDecorators";
import { EventsService } from "./EventsService";

@Injectable()
export class EventsProvider extends Provider {
  register(): void {
    Di.bind(Types.Controller).to(EventsController);
    Di.bind(EventsService).toSelf();
  }

  boot(): void {}
}
