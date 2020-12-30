import "reflect-metadata";
import { EventsProvider } from "./Business/Events/EventsProvider";
import { DatabaseProvider } from "./Infrastructure/Database/DatabaseProvider";
import { UsersProvider } from "./Business/Users/UsersProvider";
import { AuthProvider } from "./Infrastructure/Auth/AuthProvider";
import { AuthMiddleware } from "./Business/Common/Middleware/AuthMiddleware";
import { AppFactory, Di, Provider, Middleware } from "nelso/build";
import { PlacesProvider } from "./Business/Places/PlacesProvider";
import { LocationProvider } from "./Infrastructure/Location/LocationProvider";

const app = AppFactory.build();

function register() {
  /**
   * All needed providers should be registered
   * here
   */
  Di.bind(Provider).to(DatabaseProvider);
  Di.bind(Provider).to(AuthProvider);
  Di.bind(Provider).to(UsersProvider);
  Di.bind(Provider).to(EventsProvider);
  Di.bind(Provider).to(PlacesProvider);
  Di.bind(Provider).to(LocationProvider);
  Di.getAll(Provider).forEach((p) => p.register());

  /**
   * All global used middleware should
   * be registered here, module specific
   * middleware should be registered in module
   * provider
   */
  Di.bind(Middleware).to(AuthMiddleware);
}

function boot() {
  Di.getAll(Provider).forEach((p) => p.boot());
}

async function start() {
  app.start();
}

register();
boot();
start();
