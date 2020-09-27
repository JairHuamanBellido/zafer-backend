import { HttpException } from '@nestjs/common';
import { ApiResponse } from '../../../models/global/api-response.model';
import { SuccessResponse } from '../../../models/global/success-response.model';
import { OrganizationDTO } from '../dto/organization.dto';

export type CreateSuccess = SuccessResponse;

/**
 * Type para respuesta cuando se crea una organización
 */
export type CreateOrganizationSucces = Promise<
  ApiResponse<OrganizationDTO> | HttpException
>;
