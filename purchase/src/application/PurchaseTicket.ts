import TicketRepository from "../domain/repository/TicketRepository";
import EventRepository from "../domain/repository/EventRepository";
import Ticket from "../domain/entity/Ticket";
import PaymentGateway from "../infra/gateway/PaymentGateway";

export default class PurchaseTicket {

    constructor(
        readonly ticketRepository: TicketRepository,
        readonly eventRepository: EventRepository,
        readonly paymentGateway: PaymentGateway
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
        const paymentResult = await this.paymentGateway.execute({
            externalCode: input.ticketCode,
            creditCardNumber: input.creditCardNumber,
            creditCardCvv: input.creditCardCvv,
            creditCardExpDate: input.creditCardExpDate,
            total: newTicket.total
        });
        if (!paymentResult.success) throw new Error("Failed to complete payment");
        await this.ticketRepository.save(newTicket);
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