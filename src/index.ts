import { ExpressAdapter } from "./app/infrastructure/adapters/express-adapter";
import { LoadApplication } from "./app/http/load-application";
import { LoadBase } from "./app/microservice/load-base";

// const expressAdapter = new ExpressAdapter();
//
// const loadApplication = new LoadApplication(expressAdapter);
//
// loadApplication.run();
//

new LoadBase().run();
