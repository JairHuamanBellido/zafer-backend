import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from '../../../schemas/organization.schema';

@Injectable()
export class OrganizationExceptionService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>,
  ) {}

  async isNameExist(name: string): Promise<boolean> {
    const target = await this.organizationModel.findOne({ name: name });
    return (await target) !== null ? true : false;
  }
}
