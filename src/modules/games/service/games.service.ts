import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { S3 } from 'aws-sdk';
import { Model } from 'mongoose';
import { FileUpload } from '../../../models/file-upload.model';
import { Game } from '../../../schemas/game.schema';
import { CreateGameDto, GameDto } from '../dto/game.dto';
import { IGame } from '../interface/IGame.interface';
import { SearchGame, SuccessGame } from '../types/game.type';

@Injectable()
export class GamesService implements IGame {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async findByName(name: string): SearchGame {
    try {
      const games = await this.gameModel.find({
        name: { $regex: new RegExp(name, 'i') },
      });

      return {
        body: await this.transformGame(await games),
        status: HttpStatus.OK,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(file: FileUpload, game: CreateGameDto): SuccessGame {
    try {
      const createGame = new this.gameModel(game);
      createGame.avatar = await this._uploadFile(
        file.buffer,
        file.originalname,
        createGame._id,
      );
      await createGame.save();
      return {
        body: { message: 'Juego registrado con éxito' },
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async transformGame(games: Game[]): Promise<GameDto[]> {
    const gamesDTO: GameDto[] = [];
    await games.forEach(game => {
      gamesDTO.push(GameDto.transformGame(game));
    });

    return gamesDTO;
  }

  private async _uploadFile(
    dataBuffer: Buffer,
    filename: string,
    idGame: any,
  ): Promise<string> {
    const _filename = `${idGame}.${filename.split('.')[1]}`;
    const s3 = new S3();
    return await s3
      .upload({
        Bucket: process.env.AWS_BUCKET,
        Body: dataBuffer,
        Key: _filename,
        ACL: 'public-read',
      })
      .promise()
      .then(val => val.Location);
  }
}
