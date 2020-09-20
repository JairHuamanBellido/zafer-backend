import { CreateOrganizationDTO } from '../dto/organization.dto';
import { CreateSuccess } from '../type/Organization.type';

export interface IOrganization {
  create(organization: CreateOrganizationDTO): CreateSuccess;
}
