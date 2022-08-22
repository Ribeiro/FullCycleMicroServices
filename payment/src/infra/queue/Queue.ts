export default interface Queue {
    connect(): Promise<void>;
    close(): Promise<void>;
    consume(eventName: string, callback: Function): Promise<void>;
    produce(eventName: string, data: any): Promise<void>;
}