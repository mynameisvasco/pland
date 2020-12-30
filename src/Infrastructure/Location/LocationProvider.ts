import { Di, Injectable, Provider } from "nelso/build";
import { OpenRouteService } from "./OpenRouteService";

@Injectable()
export class LocationProvider extends Provider {
  register(): void {
    Di.bind(OpenRouteService).toSelf();
  }

  boot(): void {}
}
