import { FileUpload } from '../../../models/file-upload.model';
import { CreateGameDto } from '../dto/game.dto';
import { SearchGame, SuccessGame } from '../types/game.type';

export interface IGame {
  findByName(name: string): SearchGame;
  create(file: FileUpload, avatar: CreateGameDto): SuccessGame;
}
