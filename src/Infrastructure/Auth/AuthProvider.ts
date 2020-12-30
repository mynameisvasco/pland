import { Injectable, Provider, Di } from "nelso/build";
import { JwtAuthService } from "./JwtAuthService";

@Injectable()
export class AuthProvider extends Provider {
  boot(): void {
    Di.bind(JwtAuthService).toSelf();
  }

  register(): void {}
}
