import { Injectable } from '@nestjs/common';

import { User } from '../user/user.schema';

import { BoardRepository } from './board.repository';
import { Board } from './board.schema';

import { ExceptionFactory, Exceptions } from '../../util/ExceptionFactory';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  async getBoards(): Promise<Omit<Board, 'content'>[]> {
    return (await this.boardRepository.findAll()).map((board) => {
      const { title, author, createdAt } = board;
      return { _id: board['_id'], title, author, createdAt };
    });
  }

  async getBoard(boardId: string): Promise<Board> {
    if (!(await this.boardRepository.existsByBoardId(boardId))) {
      throw ExceptionFactory.of(Exceptions.BOARD_NOT_FOUND);
    }

    return await this.boardRepository.findByBoardId(boardId);
  }

  async createBoard(title: string, content: string, author: User): Promise<Board> {
    return await this.boardRepository.save({ title, content, author });
  }

  async updateBoard(boardId: string, title: string, content: string, author: User): Promise<void> {
    if (!(await this.boardRepository.existsByBoardId(boardId))) {
      throw ExceptionFactory.of(Exceptions.BOARD_NOT_FOUND);
    }

    const board = await this.boardRepository.findByBoardId(boardId);

    if (!board.author['_id'].equals(author['_id'])) {
      throw ExceptionFactory.of(Exceptions.UNAUTHORIZED);
    }

    await this.boardRepository.updateByBoardId(boardId, { title, content });
  }

  async deleteBoard(boardId: string, author: User): Promise<void> {
    if (!(await this.boardRepository.existsByBoardId(boardId))) {
      throw ExceptionFactory.of(Exceptions.BOARD_NOT_FOUND);
    }

    const board = await this.boardRepository.findByBoardId(boardId);

    if (!board.author['_id'].equals(author['_id'])) {
      throw ExceptionFactory.of(Exceptions.UNAUTHORIZED);
    }

    await this.boardRepository.deleteByBoardId(boardId);
  }
}
