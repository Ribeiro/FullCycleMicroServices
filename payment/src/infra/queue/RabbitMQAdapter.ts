import Queue from "./Queue";
import amqplib from "amqplib";

export default class RabbitMQAdapter implements Queue {

    connection: any;

    async connect(): Promise<void> {
        this.connection = await amqplib.connect("amqp://localhost");
    }

    async close(): Promise<void> {
        await this.connection.close();
    }

    async consume(eventName: string, callback: Function): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(eventName, { durable: true });
        await channel.consume(eventName, function (msg: any) {
            if (msg) {
                const input = JSON.parse(msg.content.toString());
                callback(input);
                channel.ack(msg);
            }
        });
    }

    async produce(eventName: string, data: any): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(eventName, { durable: true });
        channel.sendToQueue(eventName, Buffer.from(JSON.stringify(data)));
    }

}