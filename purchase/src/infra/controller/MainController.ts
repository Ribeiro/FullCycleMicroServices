import GetTicket from "../../application/GetTicket";
import PurchaseTicket from "../../application/PurchaseTicket";
import HttpServer from "../http/HttpServer";

export default class MainController {

    constructor(
        readonly httpServer: HttpServer,
        readonly purchaseTicket: PurchaseTicket,
        readonly getTicket: GetTicket
    ) {
        httpServer.on("post", "/purchases", async function (params: any, data: any) {
            await purchaseTicket.execute(data);
        });

        httpServer.on("get", "/tickets/:code", async function (params: any, data: any) {
            const output = await getTicket.execute(params.code);
            return output;
        });

    }
}
