import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Game extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  avatar: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
