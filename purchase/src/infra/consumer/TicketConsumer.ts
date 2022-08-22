import ConfirmTicket from "../../application/ConfirmTicket";
import PurchaseTicket from "../../application/PurchaseTicket";
import Queue from "../queue/Queue";

export default class TicketConsumer {

    constructor(readonly queue: Queue, readonly confirmTicket: ConfirmTicket, readonly purchaseTicket: PurchaseTicket) {
        queue.consume("transactionApproved", async function (msg: any) {
            //Added try/catch block in order to avoid flow break due to using in-memory repository
            try {
                await confirmTicket.execute(msg.externalCode);
            } catch (error) {
                console.log(error);
            }
        });

        queue.consume("purchaseTicket", async function (msg: any) {
            await purchaseTicket.execute(msg);
        });
    }

}