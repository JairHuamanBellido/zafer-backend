import { HttpException } from '@nestjs/common';
import { ApiResponse } from './api-response.model';

class Response {
  readonly message: string;
}

export type SuccessResponse = Promise<ApiResponse<Response> | HttpException>;
