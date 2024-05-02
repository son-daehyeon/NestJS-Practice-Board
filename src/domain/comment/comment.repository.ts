import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Comment } from './comment.schema';
import { Board } from '../board/board.schema';

import { Model } from 'mongoose';

@Injectable()
export class CommentRepository {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  async save(board: Partial<Comment>): Promise<Comment> {
    return await this.commentModel.create(board);
  }

  async findByCommentId(commentId: string): Promise<Comment> {
    return await this.commentModel.findOne({ _id: commentId }).exec();
  }

  async findAllInBoard(board: Board): Promise<Comment[]> {
    return await this.commentModel.find({ board }).exec();
  }

  async existsByCommentId(commentId: string): Promise<boolean> {
    return !!(await this.commentModel.exists({ _id: commentId }).exec());
  }

  async updateByCommentId(commentId: string, comment: Partial<Comment>): Promise<void> {
    await this.commentModel.updateOne({ _id: commentId }, comment).exec();
  }

  async deleteByCommentId(commentId: string): Promise<void> {
    await this.commentModel.deleteOne({ _id: commentId }).exec();
  }
}
