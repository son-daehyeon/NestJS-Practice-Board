import { Injectable } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { Comment } from './comment.schema';

import { User } from '../user/user.schema';

import { BoardRepository } from '../board/board.repository';

import { ExceptionFactory, Exceptions } from '../../util/ExceptionFactory';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private boardRepository: BoardRepository,
  ) {}

  async getComments(boardId: string): Promise<Comment[]> {
    if (await this.boardRepository.existsByBoardId(boardId)) {
      throw ExceptionFactory.of(Exceptions.BOARD_NOT_FOUND);
    }

    const board = await this.boardRepository.findByBoardId(boardId);

    return await this.commentRepository.findAllInBoard(board);
  }

  async createComment(content: string, author: User, boardId: string): Promise<Comment> {
    if (await this.boardRepository.existsByBoardId(boardId)) {
      throw ExceptionFactory.of(Exceptions.BOARD_NOT_FOUND);
    }

    const board = await this.boardRepository.findByBoardId(boardId);

    return await this.commentRepository.save({ content, author, board });
  }

  async updateComment(commentId: string, content: string): Promise<void> {
    await this.commentRepository.updateByCommentId(commentId, { content });
  }

  async deleteComment(commentId: string): Promise<void> {
    await this.commentRepository.deleteByCommentId(commentId);
  }
}
