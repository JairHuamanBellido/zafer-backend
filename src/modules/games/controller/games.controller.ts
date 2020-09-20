import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtAuthGuard } from '../../../guard/jwt.guard';
import { FileUpload } from '../../../models/file-upload.model';
import { CreateGameDto } from '../dto/game.dto';
import { GamesService } from '../service/games.service';
import { SearchGame, SuccessGame } from '../types/game.type';

@Controller('games')
export class GamesController {
  constructor(private gameService: GamesService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async find(@Query('name') name: string): SearchGame {
    if (name) {
      return await this.gameService.findByName(name);
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  async create(
    @Req() request: Request<any, any, CreateGameDto>,
    @UploadedFile() file: FileUpload,
  ): SuccessGame {
    return await this.gameService.create(file, request.body);
  }
}
