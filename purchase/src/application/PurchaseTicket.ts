import TicketRepository from "../domain/repository/TicketRepository";
import EventRepository from "../domain/repository/EventRepository";
import Ticket from "../domain/entity/Ticket";

export default class PurchaseTicket {

    constructor(
        readonly ticketRepository: TicketRepository,
        readonly eventRepository: EventRepository
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