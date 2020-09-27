import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../guard/jwt.guard';
import { UserJwt } from '../../../modules/user/decorator/user.decorator';
import { RequestInvitationService } from '../service/request-invitation.service';
import { RequestInvitationsSuccess } from '../type/request-invitation.type';

@Controller('request-invitations')
export class RequestInvitationController {
  constructor(
    private readonly requestInvitationService: RequestInvitationService,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAll(@UserJwt() user: string): RequestInvitationsSuccess {
    return await this.requestInvitationService.getAll(user);
  }
}
