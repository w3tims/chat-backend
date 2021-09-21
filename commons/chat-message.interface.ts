import { IChatClient } from './chat-client.interface';

export interface IChatMessage {
    client: IChatClient;
    text: string;
}