import { Injectable } from "nelso/build/decorators/DiDecorators";
import { Di } from "nelso/build/Di";
import { Provider } from "nelso/build/Provider";

import { JwtAuthService } from "./JwtAuthService";

@Injectable()
export class AuthProvider extends Provider {
  boot(): void {
    Di.bind(JwtAuthService).toSelf();
  }

  register(): void {}
}
