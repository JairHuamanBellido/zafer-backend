import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestInvitation, RequestInvitationSchema } from '../../schemas/request-invitation';
import { User, UserSchema } from '../../schemas/user.schema';
import { RequestInvitationService } from './service/request-invitation.service';
import { RequestInvitationController } from './controller/request-invitation.controller';
import { Organization, OrganizationSchema } from '../../schemas/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RequestInvitation.name, schema: RequestInvitationSchema },
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],

  providers: [RequestInvitationService],
  exports: [RequestInvitationService],
  controllers: [RequestInvitationController],
})
export class RequestInvitationModule {}
