import GetTicket from "./application/GetTicket";
import PurchaseTicket from "./application/PurchaseTicket";
import Event from "./domain/entity/Event";
import EventMemoryRepository from "./infra/repository/EventMemoryRepository";
import TicketMemoryRepository from "./infra/repository/TicketMemoryRepository";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/controller/MainController";

const httpServer = new ExpressAdapter();
const eventRepository = new EventMemoryRepository();
eventRepository.save(new Event("C", "Imersão Full Cycle", 100));
const ticketRepository = new TicketMemoryRepository();
const purchaseTicket = new PurchaseTicket(ticketRepository, eventRepository);
const getTicket = new GetTicket(ticketRepository, eventRepository);
new MainController(httpServer, purchaseTicket, getTicket);
httpServer.listen(3000);