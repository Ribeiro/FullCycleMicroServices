import TicketRepository from "../domain/repository/TicketRepository";
import EventRepository from "../domain/repository/EventRepository";
import Ticket from "../domain/entity/Ticket";
import PaymentGateway from "../infra/gateway/PaymentGateway";
import Queue from "../infra/queue/Queue";

export default class PurchaseTicket {

    constructor(
        readonly ticketRepository: TicketRepository,
        readonly eventRepository: EventRepository,
        readonly paymentGateway: PaymentGateway,
        readonly queue: Queue
    ) {

    }

    async execute(input: Input) {
        const eventFromDB = await this.eventRepository.get(input.eventCode);
        const newTicket = new Ticket(input.ticketCode,
            input.participanteName,
            input.participantEmail,
            input.creditCardNumber,
            input.creditCardCvv,
            input.creditCardExpDate,
            eventFromDB);
        // const paymentResult = await this.paymentGateway.execute({
        //     externalCode: input.ticketCode,
        //     creditCardNumber: input.creditCardNumber,
        //     creditCardCvv: input.creditCardCvv,
        //     creditCardExpDate: input.creditCardExpDate,
        //     total: newTicket.total
        // });
        await this.ticketRepository.save(newTicket);
        await this.queue.produce("ticketPurchased", {
            externalCode: input.ticketCode,
            creditCardNumber: input.creditCardNumber,
            creditCardCvv: input.creditCardCvv,
            creditCardExpDate: input.creditCardExpDate,
            total: newTicket.total
        });
    }
}

type Input = {
    ticketCode: string,
    participanteName: string,
    participantEmail: string,
    eventCode: string,
    creditCardNumber: string,
    creditCardCvv: string,
    creditCardExpDate: string
}