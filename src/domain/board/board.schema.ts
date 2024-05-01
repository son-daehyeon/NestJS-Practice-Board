import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

import { User } from '../user/user.schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  author: User;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
