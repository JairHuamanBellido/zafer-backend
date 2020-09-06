import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserExceptionService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  isEmailExist = async (email: string): Promise<boolean> => {
    const user = await this.userModel.findOne({ email: email });
    return user ? true : false;
  };
}
