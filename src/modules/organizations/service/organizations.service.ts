import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from '../../../models/global/api-response.model';
import { Game } from '../../../schemas/game.schema';
import { Organization } from '../../../schemas/organization.schema';
import { User } from '../../../schemas/user.schema';
import {
  CreateOrganizationDTO,
  OrganizationDTO,
} from '../dto/organization.dto';
import { IOrganization } from '../interface/IOrganization.interface';
import { CreateOrganizationSucces } from '../type/Organization.type';
import { OrganizationExceptionService } from './organization-exception.service';

@Injectable()
export class OrganizationsService implements IOrganization {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Game.name)
    private gameModel: Model<Game>,
    private exceptionService: OrganizationExceptionService,
  ) {}

  async create(organization: CreateOrganizationDTO): CreateOrganizationSucces {
    try {
      if (await this.exceptionService.isNameExist(organization.name)) {
        return new HttpException(
          'El nombre de la organización ya existe',
          HttpStatus.CONFLICT,
        );
      }
      const createOrganization = new this.organizationModel(organization);

      createOrganization.members = await this.userModel.find({
        _id: { $in: organization.members },
      });

      createOrganization.guestUser = await this.userModel.find({
        _id: { $in: organization.guestUsers },
      });

      createOrganization.games = await this.gameModel.find({
        _id: { $in: organization.games },
      });

      await createOrganization.save();

      return {
        body: OrganizationDTO.transform(createOrganization),
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async get(): Promise<ApiResponse<Organization[]> | HttpException> {
    try {
      return {
        body: await this.organizationModel.find(),
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
