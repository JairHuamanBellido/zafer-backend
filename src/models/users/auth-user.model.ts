import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthenticate {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UserAuthenticateResponse {
  access_token: string;
}
