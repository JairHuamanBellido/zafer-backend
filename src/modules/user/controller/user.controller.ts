import {
  Controller,
  Post,
  UseInterceptors,
  Req,
  UploadedFile,
  HttpException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../service/user.service';
import { Request } from 'express';
import { FileUpload } from '../../../models/file-upload.model';
import { CreateUser, UserDTO } from '../../../models/users/user.model';
import { ApiResponse } from '../../../models/global/api-response.model';
import { SuccessResponse } from '../../../models/global/success-response.model';
import { JwtAuthGuard } from '../../../guard/jwt.guard';
import { UserJwt } from '../decorator/user.decorator';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  async create(
    @Req() request: Request<any, any, CreateUser>,
    @UploadedFile() file: FileUpload,
  ): Promise<ApiResponse<SuccessResponse> | HttpException> {
    return await this.userService.create(file, request.body);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getPersonalInformation(
    @UserJwt() user: string,
  ): Promise<ApiResponse<UserDTO> | HttpException> {
    return this.userService.get(user);
  }
}
