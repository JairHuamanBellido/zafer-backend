import { FileUpload } from '../../../models/file-upload.model';
import { CreateUser, UserDTO } from '../../../models/users/user.model';
import { ApiResponse } from '../../../models/global/api-response.model';
import { SuccessResponse } from '../../../models/global/success-response.model';
import { HttpException } from '@nestjs/common';

export interface IUser {
  create(
    file: FileUpload,
    user: CreateUser,
  ): Promise<ApiResponse<SuccessResponse> | HttpException>;

  get(id: string): Promise<ApiResponse<UserDTO> | HttpException>;
}
