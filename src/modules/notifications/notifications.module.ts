import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { InviteGateway } from './invite/invite.gateway';
import { RequestInvitationModule } from '../request-invitation/request-invitation.module';

@Module({
  imports: [RequestInvitationModule],
  controllers: [],
  providers: [NotificationsGateway, InviteGateway],
})
export class NotificationsModule {}
