import { Injectable, Provider, Di } from "kioto/build";
import { DatabaseService } from "./DatabaseService";

@Injectable()
export class DatabaseProvider extends Provider {
  register() {
    Di.bind(DatabaseService).toSelf();
  }

  async boot() {
    Di.get(DatabaseService).boot();
  }
}
