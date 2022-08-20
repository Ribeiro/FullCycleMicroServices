import EventRepository from "../domain/repository/EventRepository";
import TicketRepository from "../domain/repository/TicketRepository";

export default class GetTicket {

    constructor(
        readonly ticketRepository: TicketRepository,
        readonly eventRepository: EventRepository
    ) {

    }

    async execute(code: string): Promise<Output> {
        const ticketFromDb = await this.ticketRepository.get(code);
        const eventFromDb = await this.eventRepository.get(ticketFromDb.eventCode);
        return {
            participantEmail: ticketFromDb.participantEmail,
            eventDescription: eventFromDb.description,
            total: ticketFromDb.total
        };
    }

}

type Output = {
    participantEmail: string,
    eventDescription: string,
    total: number
}