import { ReceiverOrganization } from '../../../modules/notifications/invite/invite.model';
import { NotificationType } from '../type/request-invitation.type';

export interface InvitationRequest {
  message: string;
  receiver: ReceiverOrganization;
  tramsmitterId: string;
  notificationType: NotificationType;
  code: string;
}
