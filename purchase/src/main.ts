import express from "express";
import GetTicket from "./application/GetTicket";
import PurchaseTicket from "./application/PurchaseTicket";
import Event from "./domain/entity/Event";
import EventMemoryRepository from "./infra/repository/EventMemoryRepository";
import TicketMemoryRepository from "./infra/repository/TicketMemoryRepository";

const app = express();
app.use(express.json());

const eventRepository = new EventMemoryRepository();
eventRepository.save(new Event("C", "Imersão Full Cycle", 100));
const ticketRepository = new TicketMemoryRepository();
const purchaseTicket = new PurchaseTicket(ticketRepository, eventRepository);
const getTicket = new GetTicket(ticketRepository, eventRepository);

app.post("/purchases", async function (req: any, res: any) {
    await purchaseTicket.execute(req.body);
    res.end();
});

app.get("/tickets/:code", async function (req: any, res: any) {
    const output = await getTicket.execute(req.params.code);
    res.json(output);
});

app.listen(3000);