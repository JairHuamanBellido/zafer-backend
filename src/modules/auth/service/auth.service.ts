import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { IAuth } from '../interface/auth.interface';
import { UserAuthenticate } from '../../../models/users/auth-user.model';
import { User } from '../../../schemas/user.schema';
import { Model } from 'mongoose';
import { AuthSuccess } from '../types/auth.type';

@Injectable()
export class AuthService implements IAuth {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async authenticate(userAuthenticate: UserAuthenticate): AuthSuccess {
    try {
      const email = await this.userModel.findOne({
        email: userAuthenticate.email,
      });
      if (!email) {
        return new HttpException(
          'No existe una cuenta con este email',
          HttpStatus.NOT_FOUND,
        );
      }
      const authUser = await this.userModel.findOne({
        email: userAuthenticate.email,
        password: userAuthenticate.password,
      });
      if (!authUser) {
        return new HttpException(
          'Contraseña incorrecta',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        body: { access_token: this.jwtService.sign({ id: authUser._id }) },
        status: 200,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
