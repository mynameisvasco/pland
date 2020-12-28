import { Injectable } from "nelso/build/decorators/DiDecorators";
import { Di } from "nelso/build/Di";
import { Provider } from "nelso/build/Provider";
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
