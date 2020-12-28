import "reflect-metadata";
import { AppFactory } from "nelso/build/AppFactory";
import { Di } from "nelso/build/Di";
import { EventsProvider } from "./Business/Events/EventsProvider";
import { Provider } from "nelso/build/Provider";
import { DatabaseProvider } from "./Infrastructure/Database/DatabaseProvider";

function register(): void {
  Di.bind(Provider).to(EventsProvider);
  Di.bind(Provider).to(DatabaseProvider);
  const providers = Di.getAll(Provider);
  providers.forEach((p) => p.register());
}

function boot(): void {
  const providers = Di.getAll(Provider);
  providers.forEach((p) => p.boot());
}

const app = AppFactory.build();
register();
boot();
app.start();
