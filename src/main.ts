import "reflect-metadata";
import { AppFactory } from "nelso/build/AppFactory";
import { Di } from "nelso/build/Di";
import { EventsProvider } from "./Business/Events/EventsProvider";
import { Provider } from "nelso/build/Provider";
import { DatabaseProvider } from "./Infrastructure/Database/DatabaseProvider";
import { UsersProvider } from "./Business/Users/UsersProvider";
import { AuthProvider } from "./Infrastructure/Auth/AuthProvider";
import { AuthMiddleware } from "./Business/Common/Middleware/AuthMiddleware";
import { Middleware } from "nelso/build/Middleware";

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
