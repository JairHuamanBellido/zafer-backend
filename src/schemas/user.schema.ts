import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({ required: true, type: String })
  fullname: string;

  @Prop({ required: true, type: String })
  phone: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: false, type: String })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
