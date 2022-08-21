import { randomUUID } from "crypto"
import GetTicket from "../src/application/GetTicket";
import PurchaseTicket from "../src/application/PurchaseTicket";
import Event from "../src/domain/entity/Event";
import PaymentGateway from "../src/infra/gateway/PaymentGateway";
import AxiosAdapter from "../src/infra/http/AxiosAdapter";
import EventMemoryRepository from "../src/infra/repository/EventMemoryRepository";
import TicketMemoryRepository from "../src/infra/repository/TicketMemoryRepository";

test("Should buy a ticket", async function () {
    const eventRepository = new EventMemoryRepository();
    eventRepository.save(new Event("C", "Imersão Full Cycle", 100));
    const ticketRepository = new TicketMemoryRepository();
    const httpClient = new AxiosAdapter();
    const paymentGateway = new PaymentGateway(httpClient);

    const purchaseTicket = new PurchaseTicket(ticketRepository, eventRepository, paymentGateway);
    const ticketCode = randomUUID();
    const input = {
        ticketCode,
        participanteName: "A",
        participantEmail: "B",
        eventCode: "C",
        creditCardNumber: "D",
        creditCardCvv: "E",
        creditCardExpDate: "F"
    };
    await purchaseTicket.execute(input);
    const getTicket = new GetTicket(ticketRepository, eventRepository);
    const output = await getTicket.execute(ticketCode);
    expect(output.total).toBe(100);
});