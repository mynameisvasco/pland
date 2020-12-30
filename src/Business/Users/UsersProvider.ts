import { Injectable, Provider, Di, Types } from "nelso/build";
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
