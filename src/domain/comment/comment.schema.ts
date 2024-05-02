import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

import { User } from '../user/user.schema';
import { Board } from '../board/board.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  author: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Board.name,
    autopopulate: true,
  })
  board: Board;

  @Prop({ required: false, default: new Date() })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
