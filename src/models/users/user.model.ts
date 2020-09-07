import { IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';
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

export class UserDTO {
  readonly name: string;
  readonly lastname: string;
  readonly avatar: string;
  readonly id: Schema.Types.ObjectId;
}
