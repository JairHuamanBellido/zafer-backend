import { Schema } from 'mongoose';
import { GameDto } from '../../../modules/games/dto/game.dto';
import { UserDTO } from '../../../modules/user/dto/user.dto';
import { Organization } from '../../../schemas/organization.schema';

export class CreateOrganizationDTO {
  readonly name: string;
  readonly fundation: Date;
  readonly email: string;
  readonly members: [Schema.Types.ObjectId];
  readonly guestUsers: [Schema.Types.ObjectId];
  readonly games: [Schema.Types.ObjectId];
}

/**
 * DTO para mostrar los detalles de una organizacion
 */
export class OrganizationDTO {
  readonly name: string;
  readonly fundation: Date;
  readonly email: string;
  readonly members: UserDTO[];
  readonly guestUsers: UserDTO[];
  readonly games: GameDto[];
  readonly id: string;

  static transform(organization: Organization): OrganizationDTO {
    return {
      id: organization._id,
      name: organization.name,
      email: organization.email,
      fundation: organization.fundation,
      guestUsers: organization.guestUser.map(e => UserDTO.transformUser(e)),
      games: organization.games.map(e => GameDto.transformGame(e)),
      members: organization.members.map(e => UserDTO.transformUser(e)),
    };
  }
}
