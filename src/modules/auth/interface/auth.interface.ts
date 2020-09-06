import { HttpException } from '@nestjs/common';
import { ApiResponse } from '../../../models/global/api-response.model';

import {
  UserAuthenticate,
  UserAuthenticateResponse,
} from '../../../models/users/auth-user.model';

export interface IAuth {
  authenticate(
    userAuth: UserAuthenticate,
  ): Promise<ApiResponse<UserAuthenticateResponse> | HttpException>;
}
