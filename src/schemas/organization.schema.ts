import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SCH } from 'mongoose';
import { Game } from './game.schema';
import { User } from './user.schema';

@Schema({ id: true })
export class Organization extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Date })
  fundation: Date;

  @Prop({ required: true, type: String })
  email: string;

  @Prop([
    {
      required: true,
      type: SCH.Types.ObjectId,
      ref: 'User',
    },
  ])
  members: User[];

  @Prop([
    {
      required: true,
      type: SCH.Types.ObjectId,
      ref: 'Game',
    },
  ])
  games: Game[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.path('id');
