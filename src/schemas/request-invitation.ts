import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SCH } from 'mongoose';
import { NotificationType } from '../modules/request-invitation/type/request-invitation.type';
import { User } from './user.schema';

@Schema()
export class RequestInvitation extends Document {
  @Prop({ required: true, type: String })
  message: string;

  @Prop({ required: true, type: SCH.Types.ObjectId, ref: 'User' })
  receiver: User;

  @Prop({ required: true, type: SCH.Types.ObjectId, ref: 'User' })
  transmitter: User;

  @Prop({ required: true })
  notificationType: NotificationType;

  @Prop({ required: true, type: String })
  code: string;

  @Prop({ required: false, type: String })
  role?: string;

  @Prop({ type: Boolean, default: true })
  available?: boolean;
}

export const RequestInvitationSchema = SchemaFactory.createForClass(
  RequestInvitation,
);
