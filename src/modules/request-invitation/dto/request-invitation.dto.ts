import { UserDTO } from '../../../modules/user/dto/user.dto';
import { RequestInvitation } from '../../../schemas/request-invitation';
import { NotificationType } from '../type/request-invitation.type';

export class RequestInvitationDTO {
  readonly message: string;
  readonly code: string;
  readonly transmitter: UserDTO;
  readonly id: string;
  readonly notificationType: NotificationType;

  static transform(requestInvitation: RequestInvitation): RequestInvitationDTO {
    return {
      code: requestInvitation.code,
      message: `${requestInvitation.transmitter.name} te ha invitado a su organización`,
      id: requestInvitation._id,
      transmitter: UserDTO.transformUser(requestInvitation.transmitter),
      notificationType: requestInvitation.notificationType,
    };
  }
}
