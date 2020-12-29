import { Injectable } from "nelso/build/decorators/DiDecorators";
import { Di, Types } from "nelso/build/Di";
import { Provider } from "nelso/build/Provider";
import { UsersController } from "./UsersController";
import { UsersService } from "./UsersService";

@Injectable()
export class UsersProvider extends Provider {
  register() {
    Di.bind(Types.Controller).to(UsersController);
    Di.bind(UsersService).toSelf();
  }

  boot() {}
}
