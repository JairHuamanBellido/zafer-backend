import { Controller, Post, Body, HttpException } from '@nestjs/common';
import {
  UserAuthenticate,
  UserAuthenticateResponse,
} from '../../../models/users/auth-user.model';
import { AuthService } from '../service/auth.service';
import { ApiResponse } from '../../../models/global/api-response.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/')
  async authenticate(
    @Body() body: UserAuthenticate,
  ): Promise<ApiResponse<UserAuthenticateResponse> | HttpException> {
    return await this.authService.authenticate(body);
  }
}
