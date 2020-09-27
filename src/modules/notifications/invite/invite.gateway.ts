import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RequestInvitationDTO } from '../../../modules/request-invitation/dto/request-invitation.dto';
import { InvitationRequest } from '../../../modules/request-invitation/model/invitation-request.model';
import { RequestInvitationService } from '../../request-invitation/service/request-invitation.service';
import { ReceiverOrganization, RequestOrganization } from './invite.model';

@WebSocketGateway({ namespace: '/invite' })
export class InviteGateway {
  @WebSocketServer() wss: Server;

  constructor(
    private readonly requestInvitationService: RequestInvitationService,
  ) {}

  @SubscribeMessage('joinroom')
  joinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(room);
  }

  @SubscribeMessage('organization')
  async saludarAll(
    @MessageBody() invitation: RequestOrganization,
  ): Promise<void> {
    invitation.receivers.forEach(async receiver => {
      const request: InvitationRequest = {
        code: invitation.code,
        message: invitation.message,
        notificationType: 'organization-request',
        receiver: receiver,
        tramsmitterId: invitation.transmitterId,
      };

      const notification = await this.requestInvitationService.create(request);

      this.inviteOrganization(receiver, notification);
    });
  }

  inviteOrganization(
    receiver: ReceiverOrganization,
    notification: RequestInvitationDTO,
  ): void {
    this.wss.to(receiver.id).emit('organization', notification);
  }
}
