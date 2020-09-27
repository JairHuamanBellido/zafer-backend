import { InvitationRequest } from "../model/invitation-request.model";
import { RequestInvitationSuccess, RequestInvitationsSuccess} from "../type/request-invitation.type";

export interface IRequestInvitation {
  create(notification: InvitationRequest): RequestInvitationSuccess;
  getAll(userId:string): RequestInvitationsSuccess;
}
