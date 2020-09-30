import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { SuccessResponse } from '../../../models/global/success-response.model';
import { JwtAuthGuard } from '../../../guard/jwt.guard';
import { UserJwt } from '../../../modules/user/decorator/user.decorator';
import { InvitationRequestReceivedDTO } from '../dto/request-invitation.dto';
import { RequestInvitationService } from '../service/request-invitation.service';
import { RequestInvitationsSuccess } from '../type/request-invitation.type';

@Controller('request-invitations')
export class RequestInvitationController {
  constructor(private readonly requestInvitationService: RequestInvitationService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAll(@UserJwt() user: string): RequestInvitationsSuccess {
    return await this.requestInvitationService.getAll(user);
  }

  @Patch('/organization/:id')
  @UseGuards(JwtAuthGuard)
  async updateRequestNotification(@Body() notification: InvitationRequestReceivedDTO, @Param('id') id: string): SuccessResponse {
    return await this.requestInvitationService.updateNotification(notification, id);
  }
}
