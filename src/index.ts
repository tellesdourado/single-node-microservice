import { ExpressAdapter } from "./app/infrastructure/adapters/express-adapter";
import { LoadApplication } from "./app/http/load-application";

const expressAdapter = new ExpressAdapter();

const loadApplication = new LoadApplication(expressAdapter);

loadApplication.run();
