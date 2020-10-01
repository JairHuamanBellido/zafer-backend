import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interface/user-service.interface';
import { FileUpload } from '../../../models/file-upload.model';
import { User } from '../../../schemas/user.schema';
import { UserExceptionService } from './user-exception.service';
import { SuccessResponse } from '../../../models/global/success-response.model';
import { CreateUser, UserDTO, UserPersonalDTO } from '../dto/user.dto';
import { SearchMe, SearchUsers } from '../types/user.type';
import { Organization } from '../../../schemas/organization.schema';
import { OrganizationDTO } from '../../../modules/organizations/dto/organization.dto';

@Injectable()
export class UserService implements IUser {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>,
    private readonly exception: UserExceptionService,
  ) {}

  async create(file: FileUpload, user: CreateUser): SuccessResponse {
    try {
      if (await this.exception.isEmailExist(user.email)) {
        return new HttpException('El correo ya existe', HttpStatus.CONFLICT);
      }
      const createdUser = new this.userModel(user);
      createdUser.fullname = createdUser.name + ' ' + createdUser.lastname;
      createdUser.avatar = await this._uploadFile(file.buffer, file.originalname, createdUser._id);
      await createdUser.save();
      return {
        body: { message: 'Usuario creado con éxito' },
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPersonalInformation(id: string): SearchMe {
    const user = await this.userModel.findOne({ _id: id });
    const organization = await this.organizationModel
      .findOne({
        members: user,
      })
      .populate('members')
      .populate('games')
      .populate('guestUser')
      .exec();

    const organizationDTO: OrganizationDTO = (await organization) !== null ? OrganizationDTO.transform(organization) : null;

    return {
      body: UserPersonalDTO.transformUser(user, organizationDTO),
      status: 200,
    };
  }

  async findByName(name: string, userId: string): SearchUsers {
    try {
      const users = await this.userModel.find({
        _id: { $ne: userId },
        fullname: { $regex: new RegExp(name, 'i') },
      });
      const usersDTO: UserDTO[] = [];
      await users.forEach(user => {
        usersDTO.push(UserDTO.transformUser(user));
      });
      return {
        body: usersDTO,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async _uploadFile(dataBuffer: Buffer, filename: string, idUser: any): Promise<string> {
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
