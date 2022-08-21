import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/controller/MainController";
import ProcessTransaction from "./application/ProcessTransaction";

const httpServer = new ExpressAdapter();
const processTransaction = new ProcessTransaction();
new MainController(httpServer, processTransaction);
httpServer.listen(3001);