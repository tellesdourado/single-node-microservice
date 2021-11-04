import { ExpressAdapter } from "./adapters/express-adapter";
import { LoadApplication } from "./http/app/load-application";

const expressAdapter = new ExpressAdapter();

const loadApplication = new LoadApplication(expressAdapter);

loadApplication.run();
