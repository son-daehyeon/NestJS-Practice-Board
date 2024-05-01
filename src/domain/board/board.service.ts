import { Injectable } from '@nestjs/common';

import { User } from '../user/user.schema';

import { BoardRepository } from './board.repository';
import { Board } from './board.schema';

import { ExceptionFactory, Exceptions } from '../../util/ExceptionFactory';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  async getBoards(): Promise<Board[]> {
    return await this.boardRepository.findAll();
  }

  async getBoard(boardId: string): Promise<Board> {
    if (!(await this.boardRepository.existsByBoardId(boardId))) {
      throw ExceptionFactory.of(Exceptions.BOARD_NOT_FOUND);
    }

    return await this.boardRepository.findByBoardId(boardId);
  }

  async createBoard(title: string, content: string, author: User): Promise<Board> {
    return await this.boardRepository.save({ title, content, author, createdAt: new Date() });
  }
}
