import { HttpException } from '@nestjs/common';
import { ApiResponse } from '../../../models/global/api-response.model';
import { RequestInvitationDTO } from '../dto/request-invitation.dto';

export type NotificationType = 'organization-request' | 'friend-request';

/**
 * Type de respuesta cuando se crea una notificacion de solicitud
 */
export type RequestInvitationSuccess = Promise<RequestInvitationDTO>;

/**
 * Type de respuesta cuando se solicita todas las  notificaciones de invitaciones de un usuario
 */
export type RequestInvitationsSuccess = Promise<
  ApiResponse<RequestInvitationDTO[]> | HttpException
>;
