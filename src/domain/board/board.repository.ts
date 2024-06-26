import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Board } from './board.schema';

import { Model } from 'mongoose';

@Injectable()
export class BoardRepository {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

  async save(board: Partial<Board>): Promise<Board> {
    return await this.boardModel.create(board);
  }

  async findAll(): Promise<Board[]> {
    return await this.boardModel.find().exec();
  }

  async findByBoardId(boardId: string): Promise<Board> {
    return await this.boardModel.findById(boardId).exec();
  }

  async existsByBoardId(boardId: string): Promise<boolean> {
    return !!(await this.boardModel.exists({ _id: boardId }).exec());
  }

  async updateByBoardId(boardId: string, board: Partial<Board>): Promise<void> {
    await this.boardModel.updateOne({ _id: boardId }, board).exec();
  }

  async deleteByBoardId(boardId: string): Promise<void> {
    await this.boardModel.deleteOne({ _id: boardId }).exec();
  }
}
