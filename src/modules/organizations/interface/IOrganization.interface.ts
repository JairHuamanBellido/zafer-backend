import { CreateOrganizationDTO } from '../dto/organization.dto';
import { CreateOrganizationSucces } from '../type/Organization.type';

export interface IOrganization {
  create(organization: CreateOrganizationDTO): CreateOrganizationSucces;
}
