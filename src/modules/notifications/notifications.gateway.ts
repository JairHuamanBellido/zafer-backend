import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'global' })
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() wss: Server;

  afterInit(): void {
    return;
  }
  handleConnection(client: Socket): void {
    client.join('abc');
  }

  @SubscribeMessage('joinroom')
  joinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ): void {
    Logger.log('Se ha unido al room', 'GLOBAL');
    client.join(room);
  }
}
