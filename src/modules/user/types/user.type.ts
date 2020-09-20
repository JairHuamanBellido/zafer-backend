import { HttpException } from '@nestjs/common';
import { ApiResponse } from '../../../models/global/api-response.model';
import { UserDTO, UserPersonalDTO } from '../dto/user.dto';

/**
 * Type para resultados de busqueda de usuarios
 */
export type SearchUsers = Promise<ApiResponse<UserDTO[]> | HttpException>;

/**
 * Type para información detallada del usuario
 */
export type SearchMe = Promise<ApiResponse<UserPersonalDTO> | HttpException>;
