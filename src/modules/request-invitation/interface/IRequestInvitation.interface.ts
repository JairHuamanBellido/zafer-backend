import { SuccessResponse } from '../../../models/global/success-response.model';
import { InvitationRequestReceivedDTO } from '../dto/request-invitation.dto';
import { InvitationRequest } from '../model/invitation-request.model';
import { RequestInvitationSuccess, RequestInvitationsSuccess } from '../type/request-invitation.type';

export interface IRequestInvitation {
  create(notification: InvitationRequest): RequestInvitationSuccess;
  getAll(userId: string): RequestInvitationsSuccess;
  updateNotification(notification: InvitationRequestReceivedDTO, id: string): SuccessResponse;
}
