import { Schema } from 'mongoose';
import { Game } from '../../../schemas/game.schema';

export class CreateGameDto {
  readonly name: string;
}

export class GameDto {
  readonly id: Schema.Types.ObjectId;
  readonly name: string;
  readonly avatar: string;

  static transformGame(game: Game): GameDto {
    return {
      id: game._id,
      avatar: game.avatar,
      name: game.name,
    };
  }
}
