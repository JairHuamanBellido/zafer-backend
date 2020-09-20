import { HttpException } from '@nestjs/common';
import { ApiResponse } from '../../../models/global/api-response.model';
import { SuccessResponse } from '../../../models/global/success-response.model';
import { GameDto } from '../dto/game.dto';

/**
 * Type para respuesta cuando se busca juegos por nombre
 */
export type SearchGame = Promise<ApiResponse<GameDto[]> | HttpException>;

/**
 * Type para respuesta cuando se crea un juego
 */
export type SuccessGame = SuccessResponse;
