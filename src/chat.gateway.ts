import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect, MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatEvent } from '../commons/chat-event.enum';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('ChatGateway');

    @SubscribeMessage(ChatEvent.NEW_MESSAGE)
    handleMessage(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
    ): void {
        console.log('handleMessage:', client, data);
        this.server.emit(ChatEvent.NEW_MESSAGE, data);
    }

    constructor(
        private appService: ChatService,
    ) {
    }

    afterInit(server: Server) {
        this.appService.clients$.subscribe(clients => {
            this.server.emit(ChatEvent.CLIENTS, clients)
        });
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        this.appService.addClient(client.id);

        this.server.emit(ChatEvent.NEW_MESSAGE, 'new connection');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.appService.removeClient(client.id);
    }


}