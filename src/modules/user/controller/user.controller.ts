import {
  Controller,
  Post,
  UseInterceptors,
  Req,
  UploadedFile,
  HttpException,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../service/user.service';
import { Request } from 'express';
import { FileUpload } from '../../../models/file-upload.model';
import { ApiResponse } from '../../../models/global/api-response.model';
import { SuccessResponse } from '../../../models/global/success-response.model';
import { JwtAuthGuard } from '../../../guard/jwt.guard';
import { UserJwt } from '../decorator/user.decorator';
import { CreateUser, UserDTO } from '../dto/user.dto';
import { SearchUsers } from '../types/user.type';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async find(
    @Query('name') name: string,
    @UserJwt() user: string,
  ): SearchUsers {
    if (name) {
      return this.userService.findByName(name, user);
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  async create(
    @Req() request: Request<any, any, CreateUser>,
    @UploadedFile() file: FileUpload,
  ): SuccessResponse {
    return await this.userService.create(file, request.body);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getPersonalInformation(
    @UserJwt() user: string,
  ): Promise<ApiResponse<UserDTO> | HttpException> {
    return this.userService.getPersonalInformation(user);
  }
}
