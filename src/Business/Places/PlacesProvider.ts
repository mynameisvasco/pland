import { Di, Injectable, Provider, Types } from "kioto/build";
import { PlacesController } from "./PlacesController";
import { PlacesService } from "./PlacesService";

@Injectable()
export class PlacesProvider extends Provider {
  register(): void {
    Di.bind(Types.Controller).to(PlacesController);
    Di.bind(PlacesService).toSelf();
  }

  boot(): void {}
}
