import ConfirmTicket from "../../application/ConfirmTicket";
import Queue from "../queue/Queue";

export default class TicketConsumer {

    constructor(readonly queue: Queue, readonly confirmTicket: ConfirmTicket) {
        queue.consume("transactionApproved", async function (msg: any) {
            await confirmTicket.execute(msg.externalCode);
        });
    }

}