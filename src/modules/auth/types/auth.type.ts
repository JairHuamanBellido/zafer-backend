import { HttpException } from '@nestjs/common';
import { ApiResponse } from '../../../models/global/api-response.model';
import { UserAuthenticateResponse } from '../../../models/users/auth-user.model';

/**
 * Type para respuesta cuando un usuario se auntetica
 */
export type AuthSuccess = Promise<
  ApiResponse<UserAuthenticateResponse> | HttpException
>;
