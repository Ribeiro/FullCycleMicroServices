import axios from "axios";
import { randomUUID } from "crypto"

test("Should buy a ticket through API", async function () {
    const ticketCode = randomUUID();
    await axios({
        url: "http://localhost:3000/purchases",
        method: "post",
        data: {
            ticketCode,
            participanteName: "A",
            participantEmail: "B",
            eventCode: "C",
            creditCardNumber: "D",
            creditCardCvv: "E",
            creditCardExpDate: "F"
        }
    });

    const response = await axios({
        url: `http://localhost:3000/tickets/${ticketCode}`,
        method: "get"
    });

    const output = response.data;
    expect(output.total).toBe(100);

});