import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../guard/jwt.guard';
import { CreateOrganizationDTO } from '../dto/organization.dto';
import { OrganizationsService } from '../service/organizations.service';
import { CreateSuccess } from '../type/Organization.type';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationService: OrganizationsService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(@Body() organization: CreateOrganizationDTO): CreateSuccess {
    return await this.organizationService.create(organization);
  }
}
