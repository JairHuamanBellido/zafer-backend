import { UserAuthenticate } from '../../../models/users/auth-user.model';
import { AuthSuccess } from '../types/auth.type';

export interface IAuth {
  authenticate(userAuth: UserAuthenticate): AuthSuccess;
}
