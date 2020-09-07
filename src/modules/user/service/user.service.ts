import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interface/user-service.interface';
import { FileUpload } from '../../../models/file-upload.model';
import { CreateUser, UserDTO } from '../../../models/users/user.model';
import { User } from '../../../schemas/user.schema';
import { ApiResponse } from '../../../models/global/api-response.model';
import { UserExceptionService } from './user-exception.service';
import { SuccessResponse } from '../../../models/global/success-response.model';

@Injectable()
export class UserService implements IUser {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly exception: UserExceptionService,
  ) {}

  async create(
    file: FileUpload,
    user: CreateUser,
  ): Promise<ApiResponse<SuccessResponse> | HttpException> {
    try {
      if (await this.exception.isEmailExist(user.email)) {
        return new HttpException('El correo ya existe', HttpStatus.CONFLICT);
      }
      const createdUser = new this.userModel(user);
      createdUser.avatar = await this._uploadFile(
        file.buffer,
        file.originalname,
        createdUser._id,
      );
      await createdUser.save();
      return {
        body: { message: 'Usuario creado con éxito' },
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async get(id: string): Promise<ApiResponse<UserDTO> | HttpException> {
    const user = await this.userModel.findOne({ _id: id });
    return { body: UserDTO.transformUser(user), status: 200 };
  }

  private async _uploadFile(
    dataBuffer: Buffer,
    filename: string,
    idUser: any,
  ): Promise<string> {
    const _filename = `${idUser}.${filename.split('.')[1]}`;
    const s3 = new S3();
    return await s3
      .upload({
        Bucket: process.env.AWS_BUCKET,
        Body: dataBuffer,
        Key: _filename,
        ACL: 'public-read',
      })
      .promise()
      .then(val => <string>val.Location);
  }
}
