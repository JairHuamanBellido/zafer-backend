import { IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';
import { OrganizationDTO } from '../../../modules/organizations/dto/organization.dto';
import { User } from '../../../schemas/user.schema';

export class CreateUser {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

/**
 * DTO para la busqueda de personas
 */
export class UserDTO {
  readonly name: string;
  readonly lastname: string;
  readonly avatar: string;
  readonly id: Schema.Types.ObjectId;
  readonly role?: string;
  static transformUser(user: User): UserDTO {
    return {
      avatar: user.avatar,
      id: user.id,
      lastname: user.lastname,
      name: user.name,
      role: user.role,
    };
  }
}

/**
 * DTO para información personal del usuario
 */
export class UserPersonalDTO {
  readonly name: string;
  readonly lastname: string;
  readonly avatar: string;
  readonly id: Schema.Types.ObjectId;
  readonly organization: OrganizationDTO;

  static transformUser(
    user: User,
    organization: OrganizationDTO | null,
  ): UserPersonalDTO {
    return {
      avatar: user.avatar,
      id: user._id,
      lastname: user.lastname,
      name: user.name,
      organization: organization,
    };
  }
}
