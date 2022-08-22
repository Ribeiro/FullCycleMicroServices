import axios from "axios";
import { randomUUID } from "crypto"

function sleep(timeout: number) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(true);
        }, timeout);
    });
}

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
    await sleep(1000);
    expect(output.total).toBe(100);
    expect(output.status).toBe("confirmed");
});