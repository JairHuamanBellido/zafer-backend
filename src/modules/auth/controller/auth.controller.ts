import { Controller, Post, Body } from '@nestjs/common';
import { UserAuthenticate } from '../../../models/users/auth-user.model';
import { AuthService } from '../service/auth.service';
import { AuthSuccess } from '../types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/')
  async authenticate(@Body() body: UserAuthenticate): AuthSuccess {
    return await this.authService.authenticate(body);
  }
}
