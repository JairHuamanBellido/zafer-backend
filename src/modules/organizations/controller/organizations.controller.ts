import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../guard/jwt.guard';
import { CreateOrganizationDTO } from '../dto/organization.dto';
import { OrganizationsService } from '../service/organizations.service';
import { CreateOrganizationSucces } from '../type/Organization.type';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationService: OrganizationsService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() organization: CreateOrganizationDTO,
  ): CreateOrganizationSucces {
    return await this.organizationService.create(organization);
  }
}
